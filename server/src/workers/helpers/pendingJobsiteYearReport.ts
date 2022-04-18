import { logger } from "@logger";
import { JobsiteYearReport } from "@models";

const pendingJobsiteYearReportUpdateHelper = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const jobsiteYearReports = await JobsiteYearReport.getByUpdatePending();

      // Update
      for (let i = 0; i < jobsiteYearReports.length; i++) {
        try {
          await jobsiteYearReports[i].updateAndSaveDocument();
        } catch (e: any) {
          logger.error(
            `Jobsite year report ${jobsiteYearReports[i]._id} pending worker error: ${e.message}`
          );
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default pendingJobsiteYearReportUpdateHelper;
