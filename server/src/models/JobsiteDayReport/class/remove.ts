import { JobsiteDayReportDocument, JobsiteMonthReport } from "@models";

const full = async (
  jobsiteDayReport: JobsiteDayReportDocument
): Promise<void> => {
  // Get all JobsiteMonthReports that contain this JobsiteDayReport
  const jobsiteMonthReports = await JobsiteMonthReport.getByJobsiteDayReport(
    jobsiteDayReport
  );

  // Remove day report from month report
  for (let i = 0; i < jobsiteMonthReports.length; i++) {
    await jobsiteMonthReports[i].removeDayReport(jobsiteDayReport);

    // Save month report
    await jobsiteMonthReports[i].save();
  }

  // Remove day report
  await jobsiteDayReport.remove();
};

export default {
  full,
};
