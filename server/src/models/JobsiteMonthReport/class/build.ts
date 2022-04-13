import { JobsiteDayReport, JobsiteMonthReportModel } from "@models";
import { CrewTypes } from "@typescript/crew";
import { IJobsiteMonthReportBuild } from "@typescript/jobsiteMonthReport";
import dayjs from "dayjs";

const documentAndSave = (
  JobsiteMonthReport: JobsiteMonthReportModel,
  data: IJobsiteMonthReportBuild
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Try to find existing
      let jobsiteMonthReport = await JobsiteMonthReport.getByJobsiteAndDate(
        data.jobsiteId,
        data.date
      );

      if (!jobsiteMonthReport) {
        jobsiteMonthReport = new JobsiteMonthReport({
          jobsite: data.jobsiteId,
          startOfMonth: dayjs(data.date).startOf("month").toDate(),
        });
      }

      const dayReports = await JobsiteDayReport.getByJobsiteAndMonth(
        data.jobsiteId,
        data.date
      );

      jobsiteMonthReport.dayReports = dayReports.map((report) => report._id);

      const crewTypes: CrewTypes[] = [];

      for (let i = 0; i < dayReports.length; i++) {
        const dayReport = dayReports[i];

        // Employee Crew Types
        for (let j = 0; j < dayReport.employees.length; j++) {
          if (!crewTypes.includes(dayReport.employees[j].crewType))
            crewTypes.push(dayReport.employees[j].crewType);
        }

        // Vehicle Crew Types
        for (let j = 0; j < dayReport.vehicles.length; j++) {
          if (!crewTypes.includes(dayReport.vehicles[j].crewType))
            crewTypes.push(dayReport.vehicles[j].crewType);
        }

        // Material Crew Types
        for (let j = 0; j < dayReport.materials.length; j++) {
          if (!crewTypes.includes(dayReport.materials[j].crewType))
            crewTypes.push(dayReport.materials[j].crewType);
        }

        // Non-costed Material Crew Types
        for (let j = 0; j < dayReport.nonCostedMaterials.length; j++) {
          if (!crewTypes.includes(dayReport.nonCostedMaterials[j].crewType))
            crewTypes.push(dayReport.nonCostedMaterials[j].crewType);
        }

        // Trucking Crew Types
        for (let j = 0; j < dayReport.trucking.length; j++) {
          if (!crewTypes.includes(dayReport.trucking[j].crewType))
            crewTypes.push(dayReport.trucking[j].crewType);
        }
      }

      jobsiteMonthReport.crewTypes = crewTypes;

      await jobsiteMonthReport.save();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  documentAndSave,
};
