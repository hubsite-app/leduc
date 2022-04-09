import {
  JobsiteDayReportDocument,
  JobsiteDayReportModel,
  JobsiteDocument,
} from "@models";

const document = (
  JobsiteDayReport: JobsiteDayReportModel,
  jobsite: JobsiteDocument,
  date: Date
) => {
  return new Promise<JobsiteDayReportDocument>(async (resolve, reject) => {
    try {
      const jobsiteDayReport = new JobsiteDayReport({
        jobsite: jobsite._id,
        date: date,
      });

      await jobsiteDayReport.generateReports();

      await jobsiteDayReport.save();

      resolve(jobsiteDayReport);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
