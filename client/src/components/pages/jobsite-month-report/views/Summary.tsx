import {
  Heading,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React from "react";
import { JobsiteMonthReportFullSnippetFragment } from "../../../../generated/graphql";
import formatNumber from "../../../../utils/formatNumber";
import Card from "../../../Common/Card";

interface IJobsiteMonthSummary {
  jobsiteMonthReport: JobsiteMonthReportFullSnippetFragment;
}

const JobsiteMonthSummary = ({ jobsiteMonthReport }: IJobsiteMonthSummary) => {
  /**
   * ----- Variables -----
   */

  const internalExpenses = React.useMemo(() => {
    let expenses = 0;

    for (let i = 0; i < jobsiteMonthReport.dayReports.length; i++) {
      const dayReport = jobsiteMonthReport.dayReports[i];

      expenses += dayReport.summary.employeeCost;
      expenses += dayReport.summary.vehicleCost;
      expenses += dayReport.summary.materialCost;
      expenses += dayReport.summary.truckingCost;
    }

    return expenses;
  }, [jobsiteMonthReport]);

  const totalExpenses = React.useMemo(() => {
    return (
      internalExpenses +
      jobsiteMonthReport.summary.externalExpenseInvoiceValue +
      jobsiteMonthReport.summary.internalExpenseInvoiceValue
    );
  }, [
    internalExpenses,
    jobsiteMonthReport.summary.externalExpenseInvoiceValue,
    jobsiteMonthReport.summary.internalExpenseInvoiceValue,
  ]);

  const netIncome = React.useMemo(() => {
    return (
      jobsiteMonthReport.summary.externalRevenueInvoiceValue +
      jobsiteMonthReport.summary.internalRevenueInvoiceValue -
      totalExpenses
    );
  }, [
    jobsiteMonthReport.summary.externalRevenueInvoiceValue,
    jobsiteMonthReport.summary.internalRevenueInvoiceValue,
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
              jobsiteMonthReport.summary.externalRevenueInvoiceValue +
                jobsiteMonthReport.summary.internalRevenueInvoiceValue
            )}
          </StatNumber>
          <StatHelpText>
            $
            {formatNumber(
              jobsiteMonthReport.summary.externalRevenueInvoiceValue
            )}{" "}
            external
          </StatHelpText>
          <StatHelpText>
            $
            {formatNumber(
              jobsiteMonthReport.summary.internalRevenueInvoiceValue
            )}{" "}
            internal
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

export default JobsiteMonthSummary;
