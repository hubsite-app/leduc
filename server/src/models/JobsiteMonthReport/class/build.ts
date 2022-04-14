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

        for (let j = 0; j < dayReport.crewTypes.length; j++) {
          if (!crewTypes.includes(dayReport.crewTypes[j]))
            crewTypes.push(dayReport.crewTypes[j]);
        }
      }

      jobsiteMonthReport.crewTypes = crewTypes;

      await jobsiteMonthReport.generateExpenseInvoiceReports();
      await jobsiteMonthReport.generateRevenueInvoiceReports();

      await jobsiteMonthReport.generateSummary();

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
