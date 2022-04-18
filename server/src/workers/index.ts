import pendingJobsiteDayReportUpdateHelper from "./helpers/PendingJobsiteDayReport";
import pendingJobsiteMonthReportUpdateHelper from "./helpers/PendingJobsiteMonthReport";
import pendingJobsiteYearReportUpdateHelper from "./helpers/pendingJobsiteYearReport";
import jobsiteDayReportUpdate from "./jobsiteDayReportUpdate";
import jobsiteMonthReportUpdate from "./jobsiteMonthReportUpdate";
import jobsiteYearReportUpdate from "./jobsiteYearReportUpdate";

const workers = async () => {
  // Handle any reports stuck in pending
  await pendingJobsiteYearReportUpdateHelper();
  await pendingJobsiteMonthReportUpdateHelper();
  await pendingJobsiteDayReportUpdateHelper();

  jobsiteYearReportUpdate;
  jobsiteMonthReportUpdate;
  jobsiteDayReportUpdate;
};

export default workers;
