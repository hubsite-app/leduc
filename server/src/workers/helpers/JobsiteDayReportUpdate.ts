import { logger } from "@logger";
import { JobsiteDayReport } from "@models";
import { UpdateStatus } from "@typescript/models";

const JobsiteDayReportUpdateHelper = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const jobsiteDayReports = await JobsiteDayReport.getByUpdateRequested();

      // Set all to pending
      for (let i = 0; i < jobsiteDayReports.length; i++) {
        try {
          jobsiteDayReports[i].update.status = UpdateStatus.Pending;
          await jobsiteDayReports[i].save();
        } catch (e: any) {
          logger.error(
            `Jobsite day report ${jobsiteDayReports[i]._id} worker error: ${e.message}`
          );
        }
      }

      // Update
      for (let i = 0; i < jobsiteDayReports.length; i++) {
        try {
          await jobsiteDayReports[i].updateAndSaveDocument();
        } catch (e: any) {
          logger.error(
            `Jobsite day report ${jobsiteDayReports[i]._id} pending worker error: ${e.message}`
          );
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default JobsiteDayReportUpdateHelper;
