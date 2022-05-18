import {
  JobsiteDayReport,
  JobsiteMonthReportDocument,
  JobsiteYearReportDocument,
} from "@models";
import { CrewTypes } from "@typescript/crew";
import dayjs from "dayjs";
import ExcelJS, { TableColumnProperties } from "exceljs";
import {
  generateCrewEmployeeCatalog,
  generateCrewEquipmentCatalog,
  generateCrewMaterialCatalog,
  generateCrewTruckingCatalog,
  generateDocumentIndex,
  getStartingColumnCell,
  getStartRowCell,
  IDocumentIndex,
} from "./helpers";

type Report = JobsiteYearReportDocument | JobsiteMonthReportDocument;

type CellLocation = { topLeft: ExcelJS.Cell; bottomRight: ExcelJS.Cell };

export type CellLocations = {
  wages?: CellLocation;
  equipment?: CellLocation;
  material?: CellLocation;
  trucking?: CellLocation;
};

const cellLocations: CellLocations[] = [];

export const generateForRangeReport = async (
  report: Report
): Promise<ExcelJS.Workbook> => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Sheet 1");

  const dayReports = await JobsiteDayReport.find({
    _id: { $in: report.dayReports },
  });

  const documentIndex = await generateDocumentIndex(dayReports);

  for (let i = 0; i < report.crewTypes.length; i++) {
    cellLocations.push({});

    await generateForCrewType(worksheet, report.crewTypes[i], documentIndex);
  }

  return workbook;
};

const generateForCrewType = async (
  worksheet: ExcelJS.Worksheet,
  crewType: CrewTypes,
  documentIndex: IDocumentIndex
) => {
  const row = worksheet.getRow(1);
  const startCell = getStartingColumnCell(worksheet, cellLocations, row);
  if (startCell) {
    startCell.value = crewType;
    startCell.style.font = {
      bold: true,
      size: 16,
    };
  }

  await generateWages(worksheet, crewType, documentIndex);
  await generateEquipment(worksheet, crewType, documentIndex);
  await generateMaterial(worksheet, crewType, documentIndex);
  await generateTrucking(worksheet, crewType, documentIndex);
};

const generateWages = async (
  worksheet: ExcelJS.Worksheet,
  crewType: CrewTypes,
  documentIndex: IDocumentIndex
) => {
  const { employeeCatalog, relevantReports } =
    await generateCrewEmployeeCatalog(crewType, documentIndex);

  const index = cellLocations.length - 1;
  const row = index === 0 ? worksheet.getRow(2) : undefined;
  const openCell = getStartingColumnCell(worksheet, cellLocations, row);

  if (openCell && employeeCatalog.length > 0) {
    const tableObject = worksheet.addTable({
      name: `Wages${crewType}`,
      ref: openCell.$col$row,
      totalsRow: true,
      columns: [
        { name: "Employee", filterButton: true },
        ...(relevantReports.map((report) => {
          return {
            name: dayjs(report.date).format("MMM D"),
            filterButton: true,
            totalsRowFunction: "sum",
          };
        }) as TableColumnProperties[]),
        { name: "Total Hours", filterButton: true, totalsRowFunction: "sum" },
        { name: "Cost", filterButton: true, totalsRowFunction: "sum" },
      ],
      rows: [
        ...employeeCatalog.map((catalogItem) => {
          return [
            catalogItem.employee.name,
            ...catalogItem.reports.map((employeeReport) => {
              if (employeeReport) return employeeReport.hours;
              else return 0;
            }),
            catalogItem.totalHours,
            catalogItem.totalCost,
          ];
        }),
      ],
    });

    // @ts-expect-error - not properly typed
    const table: ExcelJS.Table = tableObject.table;

    cellLocations[index].wages = {
      topLeft: worksheet.getCell(table.ref),
      // @ts-expect-error - not properly typed
      bottomRight: worksheet.getCell(table.tableRef.split(":")[1]),
    };
  }
};

const generateEquipment = async (
  worksheet: ExcelJS.Worksheet,
  crewType: CrewTypes,
  documentIndex: IDocumentIndex
) => {
  const { equipmentCatalog, relevantReports } =
    await generateCrewEquipmentCatalog(crewType, documentIndex);

  const index = cellLocations.length - 1;
  const rowCell = getStartRowCell(worksheet, cellLocations);
  const openCell = getStartingColumnCell(
    worksheet,
    cellLocations,
    worksheet.getRow(parseInt(rowCell.row))
  );

  if (openCell && equipmentCatalog.length > 0) {
    const tableObject = worksheet.addTable({
      name: `Equipment${crewType}`,
      ref: openCell.$col$row,
      totalsRow: true,
      columns: [
        { name: "Equipment", filterButton: true },
        ...(relevantReports.map((report) => {
          return {
            name: dayjs(report.date).format("MMM D"),
            filterButton: true,
            totalsRowFunction: "sum",
          };
        }) as TableColumnProperties[]),
        { name: "Total Hours", filterButton: true, totalsRowFunction: "sum" },
        { name: "Cost", filterButton: true, totalsRowFunction: "sum" },
      ],
      rows: [
        ...equipmentCatalog.map((catalogItem) => {
          return [
            `${catalogItem.vehicle.name} - ${catalogItem.vehicle.vehicleCode}`,
            ...catalogItem.reports.map((report) => {
              if (report) return report.hours;
              else return 0;
            }),
            catalogItem.totalHours,
            catalogItem.totalCost,
          ];
        }),
      ],
    });

    // @ts-expect-error - not properly typed
    const table: ExcelJS.Table = tableObject.table;

    cellLocations[index].equipment = {
      topLeft: worksheet.getCell(table.ref),
      // @ts-expect-error - not properly typed
      bottomRight: worksheet.getCell(table.tableRef.split(":")[1]),
    };
  }
};

const generateMaterial = async (
  worksheet: ExcelJS.Worksheet,
  crewType: CrewTypes,
  documentIndex: IDocumentIndex
) => {
  const { materialCatalog, relevantReports } =
    await generateCrewMaterialCatalog(crewType, documentIndex);

  const index = cellLocations.length - 1;
  const rowCell = getStartRowCell(worksheet, cellLocations);
  const openCell = getStartingColumnCell(
    worksheet,
    cellLocations,
    worksheet.getRow(parseInt(rowCell.row))
  );

  if (openCell && materialCatalog.length > 0) {
    const tableObject = worksheet.addTable({
      name: `Material${crewType}`,
      ref: openCell.$col$row,
      totalsRow: true,
      columns: [
        { name: "Material", filterButton: true },
        ...(relevantReports.map((report) => {
          return {
            name: dayjs(report.date).format("MMM D"),
            filterButton: true,
            totalsRowFunction: "sum",
          };
        }) as TableColumnProperties[]),
        {
          name: "Total Quantity",
          filterButton: true,
          totalsRowFunction: "sum",
        },
        { name: "Cost", filterButton: true, totalsRowFunction: "sum" },
      ],
      rows: [
        ...materialCatalog.map((catalogItem) => {
          return [
            `${catalogItem.jobsiteMaterial.material.name} - ${catalogItem.jobsiteMaterial.company.name}`,
            ...catalogItem.reports.map((report) => {
              if (report) return report.quantity;
              else return 0;
            }),
            catalogItem.totalQuantity,
            catalogItem.totalCost,
          ];
        }),
      ],
    });

    // @ts-expect-error - not properly typed
    const table: ExcelJS.Table = tableObject.table;

    cellLocations[index].material = {
      topLeft: worksheet.getCell(table.ref),
      // @ts-expect-error - not properly typed
      bottomRight: worksheet.getCell(table.tableRef.split(":")[1]),
    };
  }
};

const generateTrucking = async (
  worksheet: ExcelJS.Worksheet,
  crewType: CrewTypes,
  documentIndex: IDocumentIndex
) => {
  const { truckingCatalog, relevantReports } =
    await generateCrewTruckingCatalog(crewType, documentIndex);

  console.log(truckingCatalog);

  const index = cellLocations.length - 1;
  const row = index === 0 ? worksheet.getRow(2) : undefined;
  const openCell = getStartingColumnCell(worksheet, cellLocations, row);

  if (openCell && truckingCatalog.length > 0) {
    const tableObject = worksheet.addTable({
      name: `Trucking${crewType}`,
      ref: openCell.$col$row,
      totalsRow: true,
      columns: [
        { name: "Truck", filterButton: true },
        ...(relevantReports.map((report) => {
          return {
            name: dayjs(report.date).format("MMM D"),
            filterButton: true,
            totalsRowFunction: "sum",
          };
        }) as TableColumnProperties[]),
        { name: "Total Hours", filterButton: true, totalsRowFunction: "sum" },
        {
          name: "Total Quantity",
          filterButton: true,
          totalsRowFunction: "sum",
        },
        { name: "Cost", filterButton: true, totalsRowFunction: "sum" },
      ],
      rows: [
        ...truckingCatalog.map((catalogItem) => {
          return [
            catalogItem.truckingType,
            ...catalogItem.reports.map((truckingReport) => {
              if (truckingReport) return truckingReport.hours;
              else return 0;
            }),
            catalogItem.totalHours,
            catalogItem.totalQuantity,
            catalogItem.totalCost,
          ];
        }),
      ],
    });

    // @ts-expect-error - not properly typed
    const table: ExcelJS.Table = tableObject.table;

    cellLocations[index].trucking = {
      topLeft: worksheet.getCell(table.ref),
      // @ts-expect-error - not properly typed
      bottomRight: worksheet.getCell(table.tableRef.split(":")[1]),
    };
  }
};
