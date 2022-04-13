import {
  Box,
  Table,
  TableCaption,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import {
  CrewTypes,
  EmployeeCardSnippetFragment,
  JobsiteDayReportEmployeeSnippetFragment,
  JobsiteDayReportFullSnippetFragment,
} from "../../../generated/graphql";
import formatDate from "../../../utils/formatDate";
import formatNumber from "../../../utils/formatNumber";

interface IEmployee {
  employee: EmployeeCardSnippetFragment;
  reports: (JobsiteDayReportEmployeeSnippetFragment | null)[];
  totalHours: number;
  totalCost: number;
}

interface IJobsiteMonthEmployeeReports {
  dayReports: JobsiteDayReportFullSnippetFragment[];
  crewType: CrewTypes;
}

const JobsiteMonthEmployeeReports = ({
  dayReports,
  crewType,
}: IJobsiteMonthEmployeeReports) => {
  /**
   * ----- Variables -----
   */

  /**
   * @desc all reports w/ employee reports for the crew type
   */
  const relevantReports: JobsiteDayReportFullSnippetFragment[] =
    React.useMemo(() => {
      return dayReports.filter(
        (report) =>
          report.employees.length > 0 &&
          report.employees
            .map((employee) => employee.crewType)
            .includes(crewType)
      );
    }, [crewType, dayReports]);

  /**
   * @desc catalog of all employees and their reports
   */
  const employeeReports: IEmployee[] = React.useMemo(() => {
    const employees: IEmployee[] = [];

    // Instantiate employees
    for (let i = 0; i < relevantReports.length; i++) {
      const report = relevantReports[i];

      for (let j = 0; j < report.employees.length; j++) {
        const employeeReport = report.employees[j];

        // Only add if crewType matches
        if (employeeReport.crewType === crewType) {
          const existingIndex = employees.findIndex(
            (employee) => employee.employee._id === employeeReport.employee?._id
          );

          if (existingIndex === -1) {
            employees.push({
              employee: employeeReport.employee!,
              reports: [],
              totalCost: 0,
              totalHours: 0,
            });
          }
        }
      }
    }

    // Populate reports
    for (let i = 0; i < relevantReports.length; i++) {
      const report = relevantReports[i];

      const populatedReportIndices: number[] = [];
      for (let j = 0; j < report.employees.length; j++) {
        const employeeReport = report.employees[j];

        // Only add if crewType matches
        if (employeeReport.crewType === crewType) {
          const existingIndex = employees.findIndex(
            (employee) => employee.employee._id === employeeReport.employee?._id
          );

          if (existingIndex !== -1) {
            employees[existingIndex].reports.push(employeeReport);
            populatedReportIndices.push(existingIndex);
          }
        }
      }

      // Set null for each employee report that wasn't seen
      if (populatedReportIndices.length > 0)
        for (let j = 0; j < employees.length; j++) {
          if (!populatedReportIndices.includes(j)) {
            employees[j].reports.push(null);
          }
        }
    }

    // Generate totals
    for (let i = 0; i < employees.length; i++) {
      const reports = employees[i];

      let totalHours = 0,
        totalCost = 0;
      for (let j = 0; j < reports.reports.length; j++) {
        const report = reports.reports[j];

        if (report) {
          totalHours += report.hours;
          totalCost += report.hours * report.rate;
        }
      }

      reports.totalCost = totalCost;
      reports.totalHours = totalHours;
    }

    return employees;
  }, [crewType, relevantReports]);

  const totals: { hours: number; cost: number } = React.useMemo(() => {
    let totalHours = 0,
      totalCost = 0;
    for (let i = 0; i < employeeReports.length; i++) {
      totalHours += employeeReports[i].totalHours;
      totalCost += employeeReports[i].totalCost;
    }
    return {
      hours: totalHours,
      cost: totalCost,
    };
  }, [employeeReports]);

  /**
   * ----- Rendering -----
   */

  return (
    <Box w="100%" overflowX="scroll">
      <Table variant="striped" colorScheme="red">
        <TableCaption>Employee costing for {crewType} crew</TableCaption>
        <Thead>
          <Tr>
            <Th>Employee</Th>
            {relevantReports.map((report) => (
              <Th isNumeric key={report._id}>
                {formatDate(report.date, "MMM D")}
              </Th>
            ))}
            <Th isNumeric>Total Hours</Th>
            <Th isNumeric>Total Cost</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employeeReports.map((reports) => (
            <Tr key={reports.employee._id}>
              <Th>{reports.employee.name}</Th>
              {reports.reports.map((report) => (
                <Th isNumeric key={report?._id}>
                  {report?.hours || 0}
                </Th>
              ))}
              <Th isNumeric>{reports.totalHours}</Th>
              <Th isNumeric>${formatNumber(reports.totalCost)}</Th>
            </Tr>
          ))}
        </Tbody>
        {/* <Tfoot>
          <Tr>
            <Th>Totals</Th>
            {relevantReports.map((report) => (
              <Th isNumeric key={report._id}>
                {report.summary.employeeHours}
              </Th>
            ))}
            <Th isNumeric>{totals.hours}</Th>
            <Th isNumeric>${formatNumber(totals.cost)}</Th>
          </Tr>
        </Tfoot> */}
      </Table>
    </Box>
  );
};

export default JobsiteMonthEmployeeReports;
