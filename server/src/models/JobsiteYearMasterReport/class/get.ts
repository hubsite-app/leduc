import {
  JobsiteYearMasterReportDocument,
  JobsiteYearMasterReportModel,
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
  JobsiteYearMasterReport: JobsiteYearMasterReportModel,
  id: Id,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<JobsiteYearMasterReportDocument | null>(
    async (resolve, reject) => {
      try {
        options = populateOptions(options, byIdDefaultOptions);

        const jobsiteYearReport = await JobsiteYearMasterReport.findById(id);

        if (!jobsiteYearReport && options.throwError) {
          throw new Error(
            "JobsiteYearMasterReport.getById: unable to find jobsiteYearMasterReport"
          );
        }

        resolve(jobsiteYearReport);
      } catch (e) {
        reject(e);
      }
    }
  );
};

const byDate = (
  JobsiteYearMasterReport: JobsiteYearMasterReportModel,
  date: Date
) => {
  return new Promise<JobsiteYearMasterReportDocument | null>(
    async (resolve, reject) => {
      try {
        const jobsiteYearMasterReport = await JobsiteYearMasterReport.findOne({
          startOfYear: dayjs(date).startOf("year").toDate(),
        });

        resolve(jobsiteYearMasterReport);
      } catch (e) {
        reject(e);
      }
    }
  );
};

const byUpdateRequested = (
  JobsiteYearMasterReport: JobsiteYearMasterReportModel
) => {
  return new Promise<JobsiteYearMasterReportDocument[]>(
    async (resolve, reject) => {
      try {
        const reports = await JobsiteYearMasterReport.find({
          "update.status": UpdateStatus.Requested,
        });

        resolve(reports);
      } catch (e) {
        reject(e);
      }
    }
  );
};

const byUpdatePending = (
  JobsiteYearMasterReport: JobsiteYearMasterReportModel
) => {
  return new Promise<JobsiteYearMasterReportDocument[]>(
    async (resolve, reject) => {
      try {
        const reports = await JobsiteYearMasterReport.find({
          "update.status": UpdateStatus.Pending,
        });

        resolve(reports);
      } catch (e) {
        reject(e);
      }
    }
  );
};

/**
 * ----- Methods -----
 */

export default {
  byId,
  byDate,
  byUpdateRequested,
  byUpdatePending,
};
