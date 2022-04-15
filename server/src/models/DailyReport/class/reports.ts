import { DailyReportDocument, JobsiteDayReport } from "@models";

const requestUpdate = (dailyReport: DailyReportDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const jobsite = await dailyReport.getJobsite();

      await JobsiteDayReport.requestBuildForJobsiteDay(
        jobsite,
        dailyReport.date
      );

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  requestUpdate,
};
