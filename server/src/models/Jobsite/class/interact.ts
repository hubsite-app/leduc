import {
  JobsiteDayReport,
  JobsiteDayReportDocument,
  JobsiteDocument,
} from "@models";

const requestGenerateDayReports = async (
  jobsite: JobsiteDocument
): Promise<JobsiteDayReportDocument[]> => {
  const reports = await JobsiteDayReport.requestBuildAllForJobsite(jobsite);

  return reports;
};

export default {
  requestGenerateDayReports,
};
