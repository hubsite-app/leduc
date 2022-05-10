import { JobsiteYearMasterReport } from "@models";
import { UpdateStatus } from "@typescript/models";
import errorHandler from "@utils/errorHandler";

const JobsiteYearMasterReportUpdateHelper = async () => {
  const jobsiteYearMasterReports =
    await JobsiteYearMasterReport.getByUpdateRequested();

  // Set all to pending
  for (let i = 0; i < jobsiteYearMasterReports.length; i++) {
    try {
      jobsiteYearMasterReports[i].update.status = UpdateStatus.Pending;
      await jobsiteYearMasterReports[i].save();
    } catch (e) {
      errorHandler(
        `Jobsite year master report ${jobsiteYearMasterReports[i]._id} worker error`,
        e
      );
    }
  }

  // Update
  for (let i = 0; i < jobsiteYearMasterReports.length; i++) {
    try {
      await jobsiteYearMasterReports[i].updateAndSaveDocument();
    } catch (e) {
      errorHandler(
        `Jobsite year master report ${jobsiteYearMasterReports[i]._id} worker error`,
        e
      );
    }
  }

  return;
};

export default JobsiteYearMasterReportUpdateHelper;
