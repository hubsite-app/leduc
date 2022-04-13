import {
  Jobsite,
  JobsiteDayReport,
  JobsiteDayReportDocument,
  JobsiteDayReportModel,
  JobsiteDocument,
} from "@models";
import { Id } from "@typescript/models";
import dayjs from "dayjs";

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

const byJobsiteAndMonth = (
  JobsiteDayReport: JobsiteDayReportModel,
  jobsiteId: Id,
  date: Date
) => {
  return new Promise<JobsiteDayReportDocument[]>(async (resolve, reject) => {
    try {
      const reports = await JobsiteDayReport.find({
        jobsite: jobsiteId,
        date: {
          $gte: dayjs(date).startOf("month").toDate(),
          $lt: dayjs(date).endOf("month").toDate(),
        },
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
  byJobsiteAndMonth,
  jobsite,
};
