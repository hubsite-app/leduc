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

  /**
   * @todo add summary (report.reports[0].summary)
   */

  console.log(report);

  /**
   * ----- Rendering -----
   */

  return (
    <Box
      w="100%"
      overflowX="scroll"
      backgroundColor="gray.200"
      borderRadius={6}
      m={2}
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
            <Th>Revenue</Th>
            <Th>
              <Tooltip label="Employees, equipment, materials and trucking">
                Expenses
              </Tooltip>
            </Th>
            <Th>
              <Tooltip label="10% of Expenses">Overhead</Tooltip>
            </Th>
            <Th>Total Expenses</Th>
            <Th>Net Income</Th>
            <Th>%</Th>
            {!isConcrete ? <Th>% minus Concrete</Th> : null}
            <Th>Internal</Th>
            <Th>External</Th>
            {report.crewTypes.map(() => (
              <>
                <Th>Wages</Th>
                <Th>Equipment</Th>
                <Th>Materials</Th>
                <Th>Trucking</Th>
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
            <Th>NEED</Th>
            <Th isNumeric>${formatNumber(onSiteExpenses)}</Th>
            <Th isNumeric>${formatNumber(onSiteExpenses * 0.1)}</Th>
            <Th>NEED</Th>
            <Th>NEED</Th>
            <Th>NEED</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
};

export default JobsiteMaster;
