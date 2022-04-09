import {
  JobsiteDayReport,
  JobsiteDayReportDocument,
  JobsiteDocument,
} from "@models";

const generateDayReports = (jobsite: JobsiteDocument) => {
  return new Promise<JobsiteDayReportDocument[]>(async (resolve, reject) => {
    try {
      const reports = await JobsiteDayReport.buildAllForJobsite(jobsite);

      resolve(reports);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  generateDayReports,
};
