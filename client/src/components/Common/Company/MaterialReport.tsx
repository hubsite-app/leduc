import { Box, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import {
  CompanyMaterialReportSnippetFragment,
  CompanyMaterialReportJobDaySnippetFragment,
  JobsiteCardSnippetFragment,
} from "../../../generated/graphql";
import formatNumber from "../../../utils/formatNumber";

interface ICompanyMaterialReport {
  materialReports: CompanyMaterialReportSnippetFragment[];
}

interface RowData {
  jobsite: JobsiteCardSnippetFragment;
  date: Date;
  materials: (CompanyMaterialReportJobDaySnippetFragment | undefined)[];
}

const CompanyMaterialReport = ({ materialReports }: ICompanyMaterialReport) => {
  const rowData: RowData[] = React.useMemo(() => {
    // Create an array of all jobDays
    let allJobDays: CompanyMaterialReportJobDaySnippetFragment[] = [];
    for (let i = 0; i < materialReports.length; i++) {
      allJobDays = [...allJobDays, ...materialReports[i].jobDays];
    }
    allJobDays = allJobDays.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const rowData: RowData[] = [];

    // Create a row for each unique date / jobsite combination
    for (let i = 0; i < allJobDays.length; i++) {
      const existingIndex = rowData.findIndex(
        (day) =>
          new Date(allJobDays[i].date).getTime() === day.date.getTime() &&
          day.jobsite._id === allJobDays[i].jobsite._id
      );
      if (existingIndex === -1) {
        rowData.push({
          date: new Date(allJobDays[i].date),
          jobsite: allJobDays[i].jobsite,
          materials: [],
        });
      }
    }

    // Populate each row
    for (let i = 0; i < rowData.length; i++) {
      for (let j = 0; j < materialReports.length; j++) {
        const day = materialReports[j].jobDays.find(
          (day) =>
            new Date(day.date).getTime() === rowData[i].date.getTime() &&
            day.jobsite._id === rowData[i].jobsite._id
        );
        if (day) rowData[i].materials.push(day);
        else rowData[i].materials.push(undefined);
      }
    }

    return rowData;
  }, [materialReports]);

  const totals: number[] = React.useMemo(() => {
    return materialReports.map((report) => {
      let total = 0;
      for (let i = 0; i < report.jobDays.length; i++) {
        total += report.jobDays[i].quantity;
      }
      return total;
    });
  }, [materialReports]);

  return (
    <Box
      w="100%"
      overflowY="scroll"
      backgroundColor="gray.200"
      borderRadius={6}
      maxH="75vh"
      my={2}
    >
      <Table variant="striped" colorScheme="red" id="jobsite-report-table">
        <Thead>
          <Tr>
            <Th scope="row">Date: Job</Th>
            {materialReports.map((report) => (
              <Th key={report.material._id} isNumeric>
                {report.material.name}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rowData.map((row) => {
            const identifier = `${dayjs(row.date).format("YYYY-MM-DD")}: ${
              row.jobsite.jobcode
            }`;

            return (
              <Tr key={identifier}>
                <Td scope="row">{identifier}</Td>
                {row.materials.map((mat) => {
                  if (mat)
                    return <Td isNumeric>{formatNumber(mat.quantity)}</Td>;
                  else return <Td></Td>;
                })}
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th scope="row">Totals</Th>
            {totals.map((total, index) => (
              <Th isNumeric key={index}>
                {formatNumber(total)}
              </Th>
            ))}
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
};

export default CompanyMaterialReport;
