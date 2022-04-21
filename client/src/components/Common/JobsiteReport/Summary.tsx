import React from "react";
import {
  Heading,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import {
  JobsiteMonthReportFullSnippetFragment,
  JobsiteYearReportFullSnippetFragment,
} from "../../../generated/graphql";
import Card from "../Card";
import formatNumber from "../../../utils/formatNumber";

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
    <Card heading={<Heading size="md">Summary</Heading>}>
      <SimpleGrid spacing={2} columns={[4]}>
        <Stat>
          <StatLabel>Total Revenue</StatLabel>
          <StatNumber>
            $
            {formatNumber(
              report.summary.externalRevenueInvoiceValue +
                report.summary.internalRevenueInvoiceValue
            )}
          </StatNumber>
          <StatHelpText>
            ${formatNumber(report.summary.externalRevenueInvoiceValue)} external
          </StatHelpText>
          <StatHelpText>
            ${formatNumber(report.summary.internalRevenueInvoiceValue)} internal
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Internal Expenses</StatLabel>
          <StatNumber>${formatNumber(internalExpenses)}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Total Expenses</StatLabel>
          <StatNumber>${formatNumber(totalExpenses)}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Net Income</StatLabel>
          <StatNumber color={netIncome < 0 ? "red.500" : undefined}>
            {netIncome < 0 && "("}${formatNumber(Math.abs(netIncome))}
            {netIncome < 0 && ")"}
          </StatNumber>
        </Stat>
      </SimpleGrid>
    </Card>
  );
};

export default JobsiteReportSummary;
