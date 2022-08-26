import { JobsiteDayReport } from "@models";
import { UpdateStatus } from "@typescript/models";
import errorHandler from "@utils/errorHandler";

const JobsiteDayReportUpdateHelper = async () => {
  const jobsiteDayReports = await JobsiteDayReport.getByUpdateRequested();

  // Set all to pending
  // for (let i = 0; i < jobsiteDayReports.length; i++) {
  //   try {
  //     jobsiteDayReports[i].update.status = UpdateStatus.Pending;
  //     await jobsiteDayReports[i].save();
  //   } catch (e) {
  //     errorHandler(
  //       `Jobsite day report ${jobsiteDayReports[i]._id} worker error`,
  //       e
  //     );
  //   }
  // }

  // Update
  for (let i = 0; i < jobsiteDayReports.length; i++) {
    try {
      jobsiteDayReports[i].update.status = UpdateStatus.Pending;
      await jobsiteDayReports[i].save();

      await jobsiteDayReports[i].updateAndSaveDocument();
    } catch (e) {
      errorHandler(
        `Jobsite day report ${jobsiteDayReports[i]._id} worker error`,
        e
      );
    }
  }

  return;
};

export default JobsiteDayReportUpdateHelper;
