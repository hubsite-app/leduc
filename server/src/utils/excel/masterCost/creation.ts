import ExcelJS, { TableColumnProperties } from "exceljs";
import {
  JobsiteYearMasterReportDocument,
  JobsiteYearMasterReportItemClass,
  JobsiteYearReport,
  JobsiteYearReportDocument,
  System,
} from "@models";

export const generateForMasterReport = async (
  jobsiteYearMasterReport: JobsiteYearMasterReportDocument
) => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Master Cost");

  await generateTable(worksheet, jobsiteYearMasterReport);

  // Auto Column Width
  worksheet.columns.forEach((column) => {
    let dataMax = 2;

    if (column.eachCell)
      column.eachCell((cell) => {
        cell.numFmt = "#,##0.00";
      });

    if (column.values) {
      column.values.forEach((value) => {
        if (
          value &&
          (typeof value === "string" || typeof value === "number") &&
          `${value}`.length > dataMax
        )
          dataMax = `${value}`.length + 4;
      });
    }

    column.width = dataMax;
  });

  return workbook;
};

interface IYearReportItem
  extends Omit<JobsiteYearMasterReportItemClass, "report"> {
  report: JobsiteYearReportDocument;
}

const generateTable = async (
  worksheet: ExcelJS.Worksheet,
  jobsiteYearMasterReport: JobsiteYearMasterReportDocument
) => {
  const jobsiteYearReports: IYearReportItem[] = [];
  for (let i = 0; i < jobsiteYearMasterReport.reports.length; i++) {
    const jobsiteYearReport = await JobsiteYearReport.getById(
      jobsiteYearMasterReport.reports[i].report?.toString() || ""
    );
    if (jobsiteYearReport)
      jobsiteYearReports.push({
        report: jobsiteYearReport,
        summary: jobsiteYearMasterReport.reports[i].summary,
      });
  }

  const crewColumns: TableColumnProperties[] = [];
  for (let i = 0; i < jobsiteYearMasterReport.crewTypes.length; i++) {
    const crewType = jobsiteYearMasterReport.crewTypes[i];

    // Crew wages column
    crewColumns.push({
      name: `${crewType} Wages`,
      filterButton: true,
      totalsRowFunction: "sum",
    });

    // Crew equipment column
    crewColumns.push({
      name: `${crewType} Equipment`,
      filterButton: true,
      totalsRowFunction: "sum",
    });

    // Crew materials column
    crewColumns.push({
      name: `${crewType} Materials`,
      filterButton: true,
      totalsRowFunction: "sum",
    });

    // Crew trucking column
    crewColumns.push({
      name: `${crewType} Trucking`,
      filterButton: true,
      totalsRowFunction: "sum",
    });
  }

  worksheet.addTable({
    name: "MasterCost",
    ref: "A1",
    totalsRow: true,
    columns: [
      { name: "Jobsite", filterButton: true },
      { name: "Revenue", filterButton: true, totalsRowFunction: "sum" },
      { name: "Expenses", filterButton: true, totalsRowFunction: "sum" },
      { name: "Overhead", filterButton: true, totalsRowFunction: "sum" },
      { name: "Total Expenses", filterButton: true, totalsRowFunction: "sum" },
      { name: "Net Income", filterButton: true, totalsRowFunction: "sum" },
      { name: "%", filterButton: true, totalsRowFunction: "average" },
      {
        name: "% minus internal",
        filterButton: true,
        totalsRowFunction: "average",
      },
      { name: "Internal Subs", filterButton: true, totalsRowFunction: "sum" },
      { name: "External Subs", filterButton: true, totalsRowFunction: "sum" },
      { name: "Total Wages", filterButton: true, totalsRowFunction: "sum" },
      { name: "Total Equipment", filterButton: true, totalsRowFunction: "sum" },
      { name: "Total Materials", filterButton: true, totalsRowFunction: "sum" },
      { name: "Total Trucking", filterButton: true, totalsRowFunction: "sum" },
      ...crewColumns,
    ],
    rows: await generateRows(jobsiteYearMasterReport, jobsiteYearReports),
  });
};

type Row = (string | number)[];

const generateRows = async (
  jobsiteYearMasterReport: JobsiteYearMasterReportDocument,
  jobsiteYearReports: IYearReportItem[]
): Promise<Row[]> => {
  const rows: Row[] = [];

  const system = await System.getSystem();

  for (let i = 0; i < jobsiteYearReports.length; i++) {
    const jobsiteYearReportItem = jobsiteYearReports[i];
    const jobsiteYearReport = jobsiteYearReportItem.report;

    const jobsite = await jobsiteYearReport.getJobsite();

    const revenue =
      jobsiteYearReport.summary.externalRevenueInvoiceValue +
      jobsiteYearReport.summary.internalRevenueInvoiceValue;

    const onSiteExpenses =
      jobsiteYearReportItem.summary.employeeCost +
      jobsiteYearReportItem.summary.vehicleCost +
      jobsiteYearReportItem.summary.materialCost +
      jobsiteYearReportItem.summary.truckingCost;

    const overhead =
      onSiteExpenses * (1 + (system.internalExpenseOverheadRate || 10) / 100);

    const totalExpenses =
      overhead +
      jobsiteYearReport.summary.externalExpenseInvoiceValue * 1.03 +
      jobsiteYearReport.summary.internalExpenseInvoiceValue;

    const netIncome = revenue - totalExpenses;

    const margin = totalExpenses > 0 ? (netIncome / totalExpenses) * 100 : 0;

    const marginMinusInternal =
      totalExpenses - jobsiteYearReport.summary.internalExpenseInvoiceValue > 0
        ? (netIncome /
            (totalExpenses -
              jobsiteYearReport.summary.internalExpenseInvoiceValue)) *
          100
        : 0;

    // Handle Crew Type Costs
    const crewColumns: Row = [];
    for (let j = 0; j < jobsiteYearMasterReport.crewTypes.length; j++) {
      const crewType = jobsiteYearMasterReport.crewTypes[j];

      // See if this crew type is in the report
      const index = jobsiteYearReportItem.summary.crewTypeSummaries.findIndex(
        (summary) => summary.crewType === crewType
      );

      if (index === -1) {
        crewColumns.push(0, 0, 0, 0);
      } else {
        const crewSummary =
          jobsiteYearReportItem.summary.crewTypeSummaries[index];

        crewColumns.push(
          crewSummary.employeeCost,
          crewSummary.vehicleCost,
          crewSummary.materialCost,
          crewSummary.truckingCost
        );
      }
    }

    const row: Row = [
      `${jobsite.jobcode} - ${jobsite.name}`,
      revenue,
      onSiteExpenses,
      overhead,
      totalExpenses,
      netIncome,
      margin,
      marginMinusInternal,
      jobsiteYearReport.summary.internalExpenseInvoiceValue,
      jobsiteYearReport.summary.externalExpenseInvoiceValue,
      jobsiteYearReportItem.summary.employeeCost,
      jobsiteYearReportItem.summary.vehicleCost,
      jobsiteYearReportItem.summary.materialCost,
      jobsiteYearReportItem.summary.truckingCost,
      ...crewColumns,
    ];

    rows.push(row);
  }

  return rows;
};
