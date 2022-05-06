import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { JobsiteYearMasterReportFullSnippetFragment } from "../../../generated/graphql";
import JobsiteMasterRow from "./Row";

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
      <Alert status="info" w="100%">
        <AlertIcon />
        <AlertTitle>WIP</AlertTitle>
        <AlertDescription>
          Currently working on locking the left column
        </AlertDescription>
      </Alert>
      <Table>
        <Thead></Thead>
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
            <Th>Jobsite</Th>
            <Th>Revenue</Th>
            <Th>Expenses</Th>
            <Th>Overhead</Th>
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
      </Table>
    </Box>
  );
};

export default JobsiteMaster;
