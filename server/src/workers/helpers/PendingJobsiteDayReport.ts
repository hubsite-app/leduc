import { logger } from "@logger";
import { JobsiteDayReport } from "@models";

const pendingJobsiteDayReportUpdateHelper = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const jobsiteDayReports = await JobsiteDayReport.getByUpdatePending();

      // Update
      for (let i = 0; i < jobsiteDayReports.length; i++) {
        try {
          await jobsiteDayReports[i].updateAndSaveDocument();
        } catch (e: any) {
          logger.error(
            `Jobsite day report ${jobsiteDayReports[i]._id} worker error: ${e.message}`
          );
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default pendingJobsiteDayReportUpdateHelper;
