import { JobsiteDayReportDocument, JobsiteMonthReport } from "@models";
import { UpdateStatus } from "@typescript/models";

const document = (jobsiteDayReport: JobsiteDayReportDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await jobsiteDayReport.generateReports();

      jobsiteDayReport.update.status = UpdateStatus.Updated;
      jobsiteDayReport.update.lastUpdatedAt = new Date();

      await jobsiteDayReport.save();

      await JobsiteMonthReport.requestBuild({
        jobsiteId: jobsiteDayReport.jobsite!,
        date: jobsiteDayReport.date,
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
