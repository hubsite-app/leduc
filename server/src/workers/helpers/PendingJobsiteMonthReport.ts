import { logger } from "@logger";
import { JobsiteMonthReport } from "@models";

const pendingJobsiteMonthReportUpdateHelper = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const jobsiteMonthReports = await JobsiteMonthReport.getByUpdatePending();

      // Update
      for (let i = 0; i < jobsiteMonthReports.length; i++) {
        try {
          await jobsiteMonthReports[i].updateAndSaveDocument();
        } catch (e: any) {
          logger.error(
            `Jobsite month report ${jobsiteMonthReports[i]._id} pending worker error: ${e.message}`
          );
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default pendingJobsiteMonthReportUpdateHelper;
