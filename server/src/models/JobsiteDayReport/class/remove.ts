import {
  JobsiteDayReportDocument,
  JobsiteMonthReport,
  JobsiteYearReport,
} from "@models";

const full = async (
  jobsiteDayReport: JobsiteDayReportDocument
): Promise<void> => {
  // Get all JobsiteMonthReports that contain this JobsiteDayReport
  const jobsiteMonthReports = await JobsiteMonthReport.getByJobsiteDayReport(
    jobsiteDayReport
  );

  // Remove day report from month reports
  for (let i = 0; i < jobsiteMonthReports.length; i++) {
    await jobsiteMonthReports[i].removeDayReport(jobsiteDayReport);

    // Save month report
    await jobsiteMonthReports[i].save();
  }

  // Remove day report from year reports
  const jobsiteYearReports = await JobsiteYearReport.getByJobsiteDayReport(
    jobsiteDayReport
  );
  for (let i = 0; i < jobsiteYearReports.length; i++) {
    await jobsiteYearReports[i].removeDayReport(jobsiteDayReport);

    // Save year report
    await jobsiteYearReports[i].save();
  }

  // Remove day report
  await jobsiteDayReport.remove();
};

export default {
  full,
};
