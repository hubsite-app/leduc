import {
  Jobsite,
  JobsiteDayReport,
  JobsiteDayReportDocument,
  JobsiteDocument,
  JobsiteMonthReportDocument,
  JobsiteMonthReportModel,
} from "@models";
import { GetByIDOptions, Id } from "@typescript/models";
import populateOptions from "@utils/populateOptions";
import dayjs from "dayjs";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  JobsiteMonthReport: JobsiteMonthReportModel,
  id: Id,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<JobsiteMonthReportDocument | null>(
    async (resolve, reject) => {
      try {
        options = populateOptions(options, byIdDefaultOptions);

        const jobsiteMonthReport = await JobsiteMonthReport.findById(id);

        if (!jobsiteMonthReport && options.throwError) {
          throw new Error(
            "JobsiteMonthReport.getById: unable to find jobsiteMonthReport"
          );
        }

        resolve(jobsiteMonthReport);
      } catch (e) {
        reject(e);
      }
    }
  );
};

const byJobsiteAndDate = (
  JobsiteMonthReport: JobsiteMonthReportModel,
  jobsiteId: Id,
  date: Date
) => {
  return new Promise<JobsiteMonthReportDocument | null>(
    async (resolve, reject) => {
      try {
        const jobsiteMonthlyReport = await JobsiteMonthReport.findOne({
          jobsite: jobsiteId,
          startOfMonth: dayjs(date).startOf("month").toDate(),
        });

        resolve(jobsiteMonthlyReport);
      } catch (e) {
        reject(e);
      }
    }
  );
};

/**
 * ----- Methods -----
 */

const dayReports = (jobsiteMonthReport: JobsiteMonthReportDocument) => {
  return new Promise<JobsiteDayReportDocument[]>(async (resolve, reject) => {
    try {
      const reports = await JobsiteDayReport.find({
        _id: { $in: jobsiteMonthReport.dayReports },
      });

      resolve(reports);
    } catch (e) {
      reject(e);
    }
  });
};

const jobsite = (jobsiteMonthReport: JobsiteMonthReportDocument) => {
  return new Promise<JobsiteDocument>(async (resolve, reject) => {
    try {
      const jobsite = await Jobsite.getById(jobsiteMonthReport.jobsite!);
      if (!jobsite) throw new Error("Could not find month report jobsite");

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  byJobsiteAndDate,
  dayReports,
  jobsite,
};
