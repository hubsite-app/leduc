import { JobsiteYearMasterReport } from "@models";
import errorHandler from "@utils/errorHandler";

const pendingJobsiteYearMasterReportUpdateHelper = async () => {
  const jobsiteYearMasterReports =
    await JobsiteYearMasterReport.getByUpdatePending();

  // Update
  for (let i = 0; i < jobsiteYearMasterReports.length; i++) {
    try {
      await jobsiteYearMasterReports[i].updateAndSaveDocument();
    } catch (e) {
      errorHandler(
        `Jobsite year master report ${jobsiteYearMasterReports[i]._id} pending worker error`,
        e
      );
    }
  }

  return;
};

export default pendingJobsiteYearMasterReportUpdateHelper;
