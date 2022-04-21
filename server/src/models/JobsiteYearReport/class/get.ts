import {
  Jobsite,
  JobsiteDayReport,
  JobsiteDayReportDocument,
  JobsiteDocument,
  JobsiteYearReportDocument,
  JobsiteYearReportModel,
} from "@models";
import { GetByIDOptions, Id, UpdateStatus } from "@typescript/models";
import populateOptions from "@utils/populateOptions";
import dayjs from "dayjs";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  JobsiteYearReport: JobsiteYearReportModel,
  id: Id,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<JobsiteYearReportDocument | null>(
    async (resolve, reject) => {
      try {
        options = populateOptions(options, byIdDefaultOptions);

        const jobsiteYearReport = await JobsiteYearReport.findById(id);

        if (!jobsiteYearReport && options.throwError) {
          throw new Error(
            "JobsiteYearReport.getById: unable to find jobsiteYearReport"
          );
        }

        resolve(jobsiteYearReport);
      } catch (e) {
        reject(e);
      }
    }
  );
};

const byJobsiteAndDate = (
  JobsiteYearReport: JobsiteYearReportModel,
  jobsiteId: Id,
  date: Date
) => {
  return new Promise<JobsiteYearReportDocument | null>(
    async (resolve, reject) => {
      try {
        const jobsiteYearlyReport = await JobsiteYearReport.findOne({
          jobsite: jobsiteId,
          startOfYear: dayjs(date).startOf("year").toDate(),
        });

        resolve(jobsiteYearlyReport);
      } catch (e) {
        reject(e);
      }
    }
  );
};

const byDate = (JobsiteYearReport: JobsiteYearReportModel, date: Date) => {
  return new Promise<JobsiteYearReportDocument[]>(async (resolve, reject) => {
    try {
      const jobsiteYearlyReports = await JobsiteYearReport.find({
        startOfYear: dayjs(date).startOf("year").toDate(),
      });

      resolve(jobsiteYearlyReports);
    } catch (e) {
      reject(e);
    }
  });
};

const byUpdateRequested = (JobsiteYearReport: JobsiteYearReportModel) => {
  return new Promise<JobsiteYearReportDocument[]>(async (resolve, reject) => {
    try {
      const reports = await JobsiteYearReport.find({
        "update.status": UpdateStatus.Requested,
      });

      resolve(reports);
    } catch (e) {
      reject(e);
    }
  });
};

const byUpdatePending = (JobsiteYearReport: JobsiteYearReportModel) => {
  return new Promise<JobsiteYearReportDocument[]>(async (resolve, reject) => {
    try {
      const reports = await JobsiteYearReport.find({
        "update.status": UpdateStatus.Pending,
      });

      resolve(reports);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * ----- Methods -----
 */

const dayReports = (jobsiteYearReport: JobsiteYearReportDocument) => {
  return new Promise<JobsiteDayReportDocument[]>(async (resolve, reject) => {
    try {
      const reports = await JobsiteDayReport.find({
        _id: { $in: jobsiteYearReport.dayReports },
      });

      resolve(reports);
    } catch (e) {
      reject(e);
    }
  });
};

const jobsite = (jobsiteYearReport: JobsiteYearReportDocument) => {
  return new Promise<JobsiteDocument>(async (resolve, reject) => {
    try {
      const jobsite = await Jobsite.getById(jobsiteYearReport.jobsite!);
      if (!jobsite) throw new Error("Could not find month report jobsite");

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  byDate,
  byJobsiteAndDate,
  byUpdateRequested,
  byUpdatePending,
  dayReports,
  jobsite,
};
