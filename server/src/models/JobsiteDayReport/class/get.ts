import {
  Jobsite,
  JobsiteDayReportDocument,
  JobsiteDayReportModel,
  JobsiteDocument,
} from "@models";

const byJobsite = (
  JobsiteDayReport: JobsiteDayReportModel,
  jobsite: JobsiteDocument
) => {
  return new Promise<JobsiteDayReportDocument[]>(async (resolve, reject) => {
    try {
      const reports = await JobsiteDayReport.find({
        jobsite: jobsite._id,
      });

      resolve(reports);
    } catch (e) {
      reject(e);
    }
  });
};

const jobsite = (jobsiteDayReport: JobsiteDayReportDocument) => {
  return new Promise<JobsiteDocument>(async (resolve, reject) => {
    try {
      const jobsite = await Jobsite.getById(jobsiteDayReport.jobsite!);

      if (!jobsite) throw new Error("Cannot find jobsite for jobsiteDayReport");

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byJobsite,
  jobsite,
};
