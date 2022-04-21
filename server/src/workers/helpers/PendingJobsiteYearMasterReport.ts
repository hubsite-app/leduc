import { logger } from "@logger";
import { JobsiteYearMasterReport } from "@models";

const pendingJobsiteYearMasterReportUpdateHelper = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const jobsiteYearMasterReports =
        await JobsiteYearMasterReport.getByUpdatePending();

      // Update
      for (let i = 0; i < jobsiteYearMasterReports.length; i++) {
        try {
          await jobsiteYearMasterReports[i].updateAndSaveDocument();
        } catch (e: any) {
          logger.error(
            `Jobsite year master report ${jobsiteYearMasterReports[i]._id} pending worker error: ${e.message}`
          );
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default pendingJobsiteYearMasterReportUpdateHelper;
