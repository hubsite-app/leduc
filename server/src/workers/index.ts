import pendingJobsiteDayReportUpdateHelper from "./helpers/PendingJobsiteDayReport";
import pendingJobsiteMonthReportUpdateHelper from "./helpers/PendingJobsiteMonthReport";
import jobsiteDayReportUpdate from "./jobsiteDayReportUpdate";
import jobsiteMonthReportUpdate from "./jobsiteMonthReportUpdate";

const workers = async () => {
  // Handle any reports stuck in pending
  await pendingJobsiteMonthReportUpdateHelper();
  await pendingJobsiteDayReportUpdateHelper();

  jobsiteMonthReportUpdate;
  jobsiteDayReportUpdate;
};

export default workers;
