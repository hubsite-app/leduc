import React from "react";
import {
  Box,
  Table,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { JobsiteYearMasterReportFullSnippetFragment } from "../../../generated/graphql";
import JobsiteMasterRow from "./Row";
import formatNumber from "../../../utils/formatNumber";
import ReportSummaryCard from "../ReportSummary";

interface IJobsiteMaster {
  report: JobsiteYearMasterReportFullSnippetFragment;
}

const JobsiteMaster = ({ report }: IJobsiteMaster) => {
  /**
   * ----- Variables -----
   */

  const isConcrete = React.useMemo(() => {
    if (process.env.NEXT_PUBLIC_APP_NAME === "Concrete") return true;
    else return false;
  }, []);

  const onSiteExpenses = React.useMemo(() => {
    let expenses = 0;
    for (let i = 0; i < report.reports.length; i++) {
      const { summary } = report.reports[i];

      expenses +=
        summary.employeeCost +
        summary.vehicleCost +
        summary.materialCost +
        summary.truckingCost;
    }

    return expenses;
  }, [report]);

  const crewTotals = React.useMemo(() => {
    const crewTotals: Record<
      string,
      {
        wages: number;
        equipment: number;
        materials: number;
        trucking: number;
      }
    > = {};

    for (let i = 0; i < report.crewTypes.length; i++) {
      crewTotals[report.crewTypes[i]] = {
        equipment: 0,
        materials: 0,
        trucking: 0,
        wages: 0,
      };
    }

    for (let i = 0; i < report.reports.length; i++) {
      const { summary } = report.reports[i];

      for (let j = 0; j < summary.crewTypeSummaries.length; j++) {
        const crewSummary = summary.crewTypeSummaries[j];
        const { crewType } = crewSummary;

        crewTotals[crewType].wages += crewSummary.employeeCost;
        crewTotals[crewType].equipment += crewSummary.vehicleCost;
        crewTotals[crewType].materials += crewSummary.materialCost;
        crewTotals[crewType].trucking += crewSummary.truckingCost;
      }
    }

    return crewTotals;
  }, [report]);

  const revenue = React.useMemo(() => {
    return (
      report.summary.externalRevenueInvoiceValue +
      report.summary.internalRevenueInvoiceValue
    );
  }, [report]);

  const totalExpenses = React.useMemo(() => {
    return (
      onSiteExpenses * 1.1 +
      report.summary.externalExpenseInvoiceValue +
      report.summary.internalExpenseInvoiceValue
    );
  }, [report, onSiteExpenses]);

  const netIncome = React.useMemo(() => {
    return revenue - totalExpenses;
  }, [revenue, totalExpenses]);

  const margin = React.useMemo(() => {
    return (netIncome / totalExpenses) * 100 || 0;
  }, [netIncome, totalExpenses]);

  const marginMinusConcrete = React.useMemo(() => {
    return (
      (netIncome /
        (totalExpenses - report.summary.internalExpenseInvoiceValue)) *
        100 || 0
    );
  }, [report, netIncome, totalExpenses]);

  /**
   * ----- Rendering -----
   */

  return (
    <Box>
      <Box p={2}>
        <ReportSummaryCard
          revenue={{
            internal: report.summary.internalRevenueInvoiceValue,
            external: report.summary.externalRevenueInvoiceValue,
          }}
          internalExpenses={onSiteExpenses}
          totalExpenses={totalExpenses}
          netIncome={netIncome}
        />
      </Box>
      <Box
        w="100%"
        overflowX="scroll"
        backgroundColor="gray.200"
        borderRadius={6}
      >
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th>Sub Contractors</Th>
              <Th></Th>
              {report.crewTypes.map((crew) => (
                <>
                  <Th>{crew}</Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                </>
              ))}
            </Tr>
            <Tr>
              <Th position="sticky">Jobsite</Th>
              <Th isNumeric>Revenue</Th>
              <Th isNumeric>
                <Tooltip label="Employees, equipment, materials and trucking">
                  Expenses
                </Tooltip>
              </Th>
              <Th isNumeric>
                <Tooltip label="10% of Expenses">Overhead</Tooltip>
              </Th>
              <Th isNumeric>Total Expenses</Th>
              <Th isNumeric>Net Income</Th>
              <Th isNumeric>%</Th>
              {!isConcrete ? <Th isNumeric>% minus Concrete</Th> : null}
              <Th isNumeric>Internal</Th>
              <Th isNumeric>External</Th>
              {report.crewTypes.map(() => (
                <>
                  <Th isNumeric>Wages</Th>
                  <Th isNumeric>Equipment</Th>
                  <Th isNumeric>Materials</Th>
                  <Th isNumeric>Trucking</Th>
                </>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {report.reports.map((reportItem) => (
              <JobsiteMasterRow
                reportItem={reportItem}
                crewTypes={report.crewTypes}
                key={reportItem._id}
              />
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Totals</Th>
              <Th isNumeric>${formatNumber(revenue)}</Th>
              <Th isNumeric>${formatNumber(onSiteExpenses)}</Th>
              <Th isNumeric>${formatNumber(onSiteExpenses * 0.1)}</Th>
              <Th isNumeric>${formatNumber(totalExpenses)}</Th>
              <Th isNumeric color={netIncome < 0 ? "red.500" : undefined}>
                ${formatNumber(netIncome)}
              </Th>
              <Th isNumeric color={margin < 0 ? "red.500" : undefined}>
                %{formatNumber(margin)}
              </Th>
              {!isConcrete ? (
                <Th
                  isNumeric
                  color={marginMinusConcrete < 0 ? "red.500" : undefined}
                >
                  %{formatNumber(marginMinusConcrete)}
                </Th>
              ) : null}
              <Th isNumeric>
                ${formatNumber(report.summary.internalExpenseInvoiceValue || 0)}
              </Th>
              <Th isNumeric>
                ${formatNumber(report.summary.externalExpenseInvoiceValue || 0)}
              </Th>
              {Object.values(crewTotals).map((totals) => (
                <>
                  <Th isNumeric>${formatNumber(totals.wages)}</Th>
                  <Th isNumeric>${formatNumber(totals.equipment)}</Th>
                  <Th isNumeric>${formatNumber(totals.materials)}</Th>
                  <Th isNumeric>${formatNumber(totals.trucking)}</Th>
                </>
              ))}
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </Box>
  );
};

export default JobsiteMaster;
