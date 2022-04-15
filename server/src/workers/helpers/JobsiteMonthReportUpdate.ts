import { logger } from "@logger";
import { JobsiteMonthReport } from "@models";
import { UpdateStatus } from "@typescript/models";

const JobsiteMonthReportUpdateHelper = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const jobsiteMonthReports =
        await JobsiteMonthReport.getByUpdateRequested();

      console.log("month", jobsiteMonthReports.length);

      // Set all to pending
      for (let i = 0; i < jobsiteMonthReports.length; i++) {
        try {
          jobsiteMonthReports[i].update.status = UpdateStatus.Pending;
          await jobsiteMonthReports[i].save();
        } catch (e: any) {
          logger.error(
            `Jobsite month report ${jobsiteMonthReports[i]._id} worker error: ${e.message}`
          );
        }
      }

      // Update
      for (let i = 0; i < jobsiteMonthReports.length; i++) {
        try {
          await jobsiteMonthReports[i].updateAndSaveDocument();
        } catch (e: any) {
          logger.error(
            `Jobsite month report ${jobsiteMonthReports[i]._id} worker error: ${e.message}`
          );
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default JobsiteMonthReportUpdateHelper;
