import { logger } from "@logger";
import { JobsiteYearReport } from "@models";
import { UpdateStatus } from "@typescript/models";

const JobsiteYearReportUpdateHelper = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const jobsiteYearReports = await JobsiteYearReport.getByUpdateRequested();

      // Set all to pending
      for (let i = 0; i < jobsiteYearReports.length; i++) {
        try {
          jobsiteYearReports[i].update.status = UpdateStatus.Pending;
          await jobsiteYearReports[i].save();
        } catch (e: any) {
          logger.error(
            `Jobsite year report ${jobsiteYearReports[i]._id} worker error: ${e.message}`
          );
        }
      }

      // Update
      for (let i = 0; i < jobsiteYearReports.length; i++) {
        try {
          await jobsiteYearReports[i].updateAndSaveDocument();
        } catch (e: any) {
          logger.error(
            `Jobsite year report ${jobsiteYearReports[i]._id} worker error: ${e.message}`
          );
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default JobsiteYearReportUpdateHelper;
