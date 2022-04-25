import { JobsiteYearReport } from "@models";
import { UpdateStatus } from "@typescript/models";
import errorHandler from "@utils/errorHandler";

const JobsiteYearReportUpdateHelper = async () => {
  const jobsiteYearReports = await JobsiteYearReport.getByUpdateRequested();

  // Set all to pending
  for (let i = 0; i < jobsiteYearReports.length; i++) {
    try {
      jobsiteYearReports[i].update.status = UpdateStatus.Pending;
      await jobsiteYearReports[i].save();
    } catch (e) {
      errorHandler(
        `Jobsite year report ${jobsiteYearReports[i]._id} worker error`,
        e
      );
    }
  }

  // Update
  for (let i = 0; i < jobsiteYearReports.length; i++) {
    try {
      await jobsiteYearReports[i].updateAndSaveDocument();
    } catch (e) {
      errorHandler(
        `Jobsite year report ${jobsiteYearReports[i]._id} worker error`,
        e
      );
    }
  }

  return;
};

export default JobsiteYearReportUpdateHelper;
