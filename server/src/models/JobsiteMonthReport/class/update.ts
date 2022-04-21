import {
  JobsiteDayReport,
  JobsiteMonthReportDocument,
  JobsiteYearReport,
} from "@models";
import { CrewTypes } from "@typescript/crew";
import { UpdateStatus } from "@typescript/models";

const document = (jobsiteMonthReport: JobsiteMonthReportDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const dayReports = await JobsiteDayReport.getByJobsiteAndMonth(
        jobsiteMonthReport.jobsite!,
        jobsiteMonthReport.startOfMonth
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

      jobsiteMonthReport.update.status = UpdateStatus.Updated;
      jobsiteMonthReport.update.lastUpdatedAt = new Date();

      await jobsiteMonthReport.save();

      await JobsiteYearReport.requestBuild({
        jobsiteId: jobsiteMonthReport.jobsite!,
        date: jobsiteMonthReport.startOfMonth,
      });

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
