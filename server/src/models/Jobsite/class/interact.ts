import {
  JobsiteDayReport,
  JobsiteDayReportDocument,
  JobsiteDocument,
  JobsiteMonthReport,
  JobsiteMonthReportDocument,
  JobsiteYearReport,
  JobsiteYearReportDocument,
} from "@models";

const requestGenerateDayReports = async (
  jobsite: JobsiteDocument
): Promise<JobsiteDayReportDocument[]> => {
  const reports = await JobsiteDayReport.requestBuildAllForJobsite(jobsite);

  return reports;
};

const requestGenerateMonthReports = async (
  jobsite: JobsiteDocument
): Promise<JobsiteMonthReportDocument[]> => {
  const monthReports = await JobsiteMonthReport.getByJobsite(jobsite);

  for (const report of monthReports) {
    await report.requestBuild();
  }

  return monthReports;
};

const requestGenerateYearReports = async (
  jobsite: JobsiteDocument
): Promise<JobsiteYearReportDocument[]> => {
  const yearReports = await JobsiteYearReport.getByJobsite(jobsite);

  for (const report of yearReports) {
    await report.requestBuild();
  }

  return yearReports;
};

export default {
  requestGenerateDayReports,
  requestGenerateMonthReports,
  requestGenerateYearReports,
};
