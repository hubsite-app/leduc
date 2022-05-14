import { Code, Flex, Text } from "@chakra-ui/react";
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
      internalExpenses * 1.1 +
      report.summary.externalExpenseInvoiceValue * 1.03 +
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
      revenueTooltip={
        <Flex flexDir="column">
          <Code backgroundColor="transparent" color="white">
            + Internal Revenue Invoices
          </Code>
          <Code backgroundColor="transparent" color="white">
            + External Revenue Invoices
          </Code>
        </Flex>
      }
      showRevenueBreakdown={false}
      internalExpenses={internalExpenses}
      internalExpensesTooltip={
        <Flex flexDir="column">
          <Code backgroundColor="transparent" color="white">
            + Wages
          </Code>
          <Code backgroundColor="transparent" color="white">
            + Equipment
          </Code>
          <Code backgroundColor="transparent" color="white">
            + Materials
          </Code>
          <Code backgroundColor="transparent" color="white">
            + Trucking
          </Code>
        </Flex>
      }
      netIncome={netIncome}
      netIncomeTooltip={
        <Flex flexDir="column">
          <Code backgroundColor="transparent" color="white">
            + Total Revenue
          </Code>
          <Code backgroundColor="transparent" color="white">
            - Total Expenses
          </Code>
        </Flex>
      }
      totalExpenses={totalExpenses}
      totalExpensesTooltip={
        <Flex flexDir="column">
          <Code backgroundColor="transparent" color="white">
            + Internal Expenses + 10%
          </Code>
          <Code backgroundColor="transparent" color="white">
            + External Invoices + 3%
          </Code>
          <Code backgroundColor="transparent" color="white">
            + Internal Invoices
          </Code>
        </Flex>
      }
      issues={report.issues}
    />
  );
};

export default JobsiteReportSummary;
