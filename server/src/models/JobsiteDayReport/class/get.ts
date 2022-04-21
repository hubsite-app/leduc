import {
  Jobsite,
  JobsiteDayReport,
  JobsiteDayReportDocument,
  JobsiteDayReportModel,
  JobsiteDocument,
} from "@models";
import { Id, UpdateStatus } from "@typescript/models";
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

const byJobsiteAndYear = (
  JobsiteDayReport: JobsiteDayReportModel,
  jobsiteId: Id,
  date: Date
) => {
  return new Promise<JobsiteDayReportDocument[]>(async (resolve, reject) => {
    try {
      const reports = await JobsiteDayReport.find({
        jobsite: jobsiteId,
        date: {
          $gte: dayjs(date).startOf("year").toDate(),
          $lt: dayjs(date).endOf("year").toDate(),
        },
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

const byJobsiteAndDay = (
  JobsiteDayReport: JobsiteDayReportModel,
  jobsiteId: Id,
  day: Date
) => {
  return new Promise<JobsiteDayReportDocument | null>(
    async (resolve, reject) => {
      try {
        const report = await JobsiteDayReport.findOne({
          jobsite: jobsiteId,
          date: {
            $gte: dayjs(day).startOf("day").toDate(),
            $lt: dayjs(day).endOf("day").toDate(),
          },
        });

        resolve(report);
      } catch (e) {
        reject(e);
      }
    }
  );
};

const byUpdateRequested = (JobsiteDayReport: JobsiteDayReportModel) => {
  return new Promise<JobsiteDayReportDocument[]>(async (resolve, reject) => {
    try {
      const reports = await JobsiteDayReport.find({
        "update.status": UpdateStatus.Requested,
      });

      resolve(reports);
    } catch (e) {
      reject(e);
    }
  });
};

const byUpdatePending = (JobsiteDayReport: JobsiteDayReportModel) => {
  return new Promise<JobsiteDayReportDocument[]>(async (resolve, reject) => {
    try {
      const reports = await JobsiteDayReport.find({
        "update.status": UpdateStatus.Pending,
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
  byJobsiteAndYear,
  byJobsiteAndMonth,
  byJobsiteAndDay,
  byUpdateRequested,
  byUpdatePending,
  jobsite,
};
