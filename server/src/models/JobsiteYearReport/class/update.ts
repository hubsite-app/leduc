import {
  JobsiteDayReport,
  JobsiteYearMasterReport,
  JobsiteYearReportDocument,
} from "@models";
import { CrewTypes } from "@typescript/crew";
import { UpdateStatus } from "@typescript/models";

const document = (jobsiteYearReport: JobsiteYearReportDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const dayReports = await JobsiteDayReport.getByJobsiteAndYear(
        jobsiteYearReport.jobsite!,
        jobsiteYearReport.startOfYear
      );

      jobsiteYearReport.dayReports = dayReports.map((report) => report._id);

      const crewTypes: CrewTypes[] = [];
      for (let i = 0; i < dayReports.length; i++) {
        const dayReport = dayReports[i];

        for (let j = 0; j < dayReport.crewTypes.length; j++) {
          if (!crewTypes.includes(dayReport.crewTypes[j]))
            crewTypes.push(dayReport.crewTypes[j]);
        }
      }

      jobsiteYearReport.crewTypes = crewTypes;

      await jobsiteYearReport.generateExpenseInvoiceReports();
      await jobsiteYearReport.generateRevenueInvoiceReports();

      await jobsiteYearReport.generateSummary();

      jobsiteYearReport.update.status = UpdateStatus.Updated;
      jobsiteYearReport.update.lastUpdatedAt = new Date();

      await jobsiteYearReport.save();

      await JobsiteYearMasterReport.requestBuild(jobsiteYearReport.startOfYear);

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
