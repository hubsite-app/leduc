import { JobsiteDayReportDocument, JobsiteMonthReportDocument } from "@models";

const dayReport = (
  jobsiteMonthReport: JobsiteMonthReportDocument,
  jobsiteDayReport: JobsiteDayReportDocument
): void => {
  // Get index of JobsiteDayReport in JobsiteMonthReport
  const index = jobsiteMonthReport.dayReports.indexOf(jobsiteDayReport._id);

  // Remove JobsiteDayReport from JobsiteMonthReport if it exists
  if (index > -1) {
    jobsiteMonthReport.dayReports.splice(index, 1);
  }
};

export default {
  dayReport,
};
