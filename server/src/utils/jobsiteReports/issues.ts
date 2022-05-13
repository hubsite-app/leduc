import { JobsiteDayReportDocument } from "@models";
import {
  IssuesGenerationArray,
  ReportIssueTypes,
} from "@typescript/jobsiteReports";
import { Id } from "@typescript/models";

export const dayReportIssueGeneration = (
  dayReports: JobsiteDayReportDocument[]
) => {
  const issues: IssuesGenerationArray[] = [];

  const foundZeroEmployee: Id[] = [],
    foundZeroVehicle: Id[] = [];
  for (let i = 0; i < dayReports.length; i++) {
    const dayReport = dayReports[i];
    // Employee
    for (let j = 0; j < dayReport.employees.length; j++) {
      const employeeReport = dayReport.employees[j];

      // Rate is 0
      if (employeeReport.rate === 0) {
        if (
          employeeReport.employee &&
          !foundZeroEmployee.includes(employeeReport.employee.toString())
        ) {
          issues.push({
            type: ReportIssueTypes.EmployeeRateZero,
            employee: employeeReport.employee,
          });

          foundZeroEmployee.push(employeeReport.employee.toString());
        }
      }
    }

    // Vehicle
    for (let j = 0; j < dayReport.vehicles.length; j++) {
      const vehicleReport = dayReport.vehicles[j];

      // Rate is 0
      if (vehicleReport.rate === 0) {
        if (
          vehicleReport.vehicle &&
          !foundZeroVehicle.includes(vehicleReport.vehicle.toString())
        ) {
          issues.push({
            type: ReportIssueTypes.VehicleRateZero,
            vehicle: vehicleReport.vehicle,
          });

          foundZeroVehicle.push(vehicleReport.vehicle.toString());
        }
      }
    }
  }

  return issues;
};
