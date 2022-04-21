import {
  JobsiteDayReport,
  JobsiteDayReportDocument,
  JobsiteDocument,
} from "@models";

const requestGenerateDayReports = (jobsite: JobsiteDocument) => {
  return new Promise<JobsiteDayReportDocument[]>(async (resolve, reject) => {
    try {
      const reports = await JobsiteDayReport.requestBuildAllForJobsite(jobsite);

      resolve(reports);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  requestGenerateDayReports,
};
