import { JobsiteDayReport } from "@models";
import errorHandler from "@utils/errorHandler";

const pendingJobsiteDayReportUpdateHelper = async () => {
  const jobsiteDayReports = await JobsiteDayReport.getByUpdatePending();

  // Update
  for (let i = 0; i < jobsiteDayReports.length; i++) {
    try {
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

export default pendingJobsiteDayReportUpdateHelper;
