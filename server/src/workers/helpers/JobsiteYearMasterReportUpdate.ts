import { logger } from "@logger";
import { JobsiteYearMasterReport } from "@models";
import { UpdateStatus } from "@typescript/models";

const JobsiteYearMasterReportUpdateHelper = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const jobsiteYearMasterReports =
        await JobsiteYearMasterReport.getByUpdateRequested();

      // Set all to pending
      for (let i = 0; i < jobsiteYearMasterReports.length; i++) {
        try {
          jobsiteYearMasterReports[i].update.status = UpdateStatus.Pending;
          await jobsiteYearMasterReports[i].save();
        } catch (e: any) {
          logger.error(
            `Jobsite year master report ${jobsiteYearMasterReports[i]._id} worker error: ${e.message}`
          );
        }
      }

      // Update
      for (let i = 0; i < jobsiteYearMasterReports.length; i++) {
        try {
          await jobsiteYearMasterReports[i].updateAndSaveDocument();
        } catch (e: any) {
          logger.error(
            `Jobsite year master report ${jobsiteYearMasterReports[i]._id} worker error: ${e.message}`
          );
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default JobsiteYearMasterReportUpdateHelper;
