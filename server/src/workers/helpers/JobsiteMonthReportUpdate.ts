import { JobsiteMonthReport } from "@models";
import { UpdateStatus } from "@typescript/models";
import errorHandler from "@utils/errorHandler";

const JobsiteMonthReportUpdateHelper = async () => {
  const jobsiteMonthReports = await JobsiteMonthReport.getByUpdateRequested();

  // Set all to pending
  for (let i = 0; i < jobsiteMonthReports.length; i++) {
    try {
      jobsiteMonthReports[i].update.status = UpdateStatus.Pending;
      await jobsiteMonthReports[i].save();
    } catch (e) {
      errorHandler(
        `Jobsite month report ${jobsiteMonthReports[i]._id} worker error`,
        e
      );
    }
  }

  // Update
  for (let i = 0; i < jobsiteMonthReports.length; i++) {
    try {
      await jobsiteMonthReports[i].updateAndSaveDocument();
    } catch (e) {
      errorHandler(
        `Jobsite month report ${jobsiteMonthReports[i]._id} worker error`,
        e
      );
    }
  }

  return;
};

export default JobsiteMonthReportUpdateHelper;
