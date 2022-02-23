import { Types } from "mongoose";

import {
  Crew,
  CrewDocument,
  DailyReport,
  DailyReportDocument,
  JobsiteDocument,
  JobsiteModel,
} from "@models";
import { GetByIDOptions } from "@typescript/models";
import populateOptions from "@utils/populateOptions";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  Jobsite: JobsiteModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<JobsiteDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const jobsite = await Jobsite.findById(id);

      if (!jobsite && options.throwError) {
        throw new Error("Jobsite.getById: unable to find jobsite");
      }

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

const byCrew = (Jobsite: JobsiteModel, crew: CrewDocument) => {
  return new Promise<JobsiteDocument[]>(async (resolve, reject) => {
    try {
      const jobsites = await Jobsite.find({ crews: crew._id });

      resolve(jobsites);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * ----- Methods -----
 */

const crews = (jobsite: JobsiteDocument) => {
  return new Promise<CrewDocument[]>(async (resolve, reject) => {
    try {
      const crews = await Crew.find({ _id: { $in: jobsite.crews } });

      resolve(crews);
    } catch (e) {
      reject(e);
    }
  });
};

const dailyReports = (jobsite: JobsiteDocument) => {
  return new Promise<DailyReportDocument[]>(async (resolve, reject) => {
    try {
      const dailyReports = await DailyReport.find({ jobsite: jobsite._id });

      resolve(dailyReports);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  byCrew,
  crews,
  dailyReports,
};
