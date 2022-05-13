import React from "react";
import {
  JobsiteMonthReportFullSnippetFragment,
  JobsiteYearReportFullSnippetFragment,
} from "../../../generated/graphql";
import ReportSummaryCard from "../ReportSummary";

interface IJobsiteReportSummary {
  report:
    | JobsiteMonthReportFullSnippetFragment
    | JobsiteYearReportFullSnippetFragment;
}

const JobsiteReportSummary = ({ report }: IJobsiteReportSummary) => {
  /**
   * ----- Variables -----
   */

  console.log(report.issues);

  const internalExpenses = React.useMemo(() => {
    let expenses = 0;

    for (let i = 0; i < report.dayReports.length; i++) {
      const dayReport = report.dayReports[i];

      expenses += dayReport.summary.employeeCost;
      expenses += dayReport.summary.vehicleCost;
      expenses += dayReport.summary.materialCost;
      expenses += dayReport.summary.truckingCost;
    }

    return expenses;
  }, [report]);

  const totalExpenses = React.useMemo(() => {
    return (
      internalExpenses +
      report.summary.externalExpenseInvoiceValue +
      report.summary.internalExpenseInvoiceValue
    );
  }, [
    internalExpenses,
    report.summary.externalExpenseInvoiceValue,
    report.summary.internalExpenseInvoiceValue,
  ]);

  const netIncome = React.useMemo(() => {
    return (
      report.summary.externalRevenueInvoiceValue +
      report.summary.internalRevenueInvoiceValue -
      totalExpenses
    );
  }, [
    report.summary.externalRevenueInvoiceValue,
    report.summary.internalRevenueInvoiceValue,
    totalExpenses,
  ]);

  /**
   * ----- Rendering -----
   */

  return (
    <ReportSummaryCard
      revenue={{
        internal: report.summary.internalRevenueInvoiceValue,
        external: report.summary.externalRevenueInvoiceValue,
      }}
      showRevenueBreakdown={false}
      internalExpenses={internalExpenses}
      netIncome={netIncome}
      totalExpenses={totalExpenses}
      issues={report.issues}
    />
  );
};

export default JobsiteReportSummary;
