import { Types } from "mongoose";

import {
  Crew,
  CrewDocument,
  DailyReportDocument,
  DailyReportModel,
  Employee,
  EmployeeDocument,
  EmployeeWork,
  EmployeeWorkDocument,
  Jobsite,
  JobsiteDayReportDocument,
  JobsiteDocument,
  MaterialShipment,
  MaterialShipmentDocument,
  Production,
  ProductionDocument,
  ReportNote,
  ReportNoteDocument,
  Vehicle,
  VehicleDocument,
  VehicleWork,
  VehicleWorkDocument,
} from "@models";
import {
  GetByIDOptions,
  Id,
  IListOptions,
  ISearchOptions,
} from "@typescript/models";
import populateOptions from "@utils/populateOptions";
import ElasticsearchClient from "@elasticsearch/client";
import { IDailyReportSearchObject } from "@typescript/dailyReport";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";
import dayjs from "dayjs";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  DailyReport: DailyReportModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<DailyReportDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const dailyReport = await DailyReport.findById(id);

      if (!dailyReport && options.throwError) {
        throw new Error("DailyReport.getById: unable to find daily report");
      }

      resolve(dailyReport);
    } catch (e) {
      reject(e);
    }
  });
};

const search = (
  DailyReport: DailyReportModel,
  searchString: string,
  options?: ISearchOptions
) => {
  return new Promise<IDailyReportSearchObject[]>(async (resolve, reject) => {
    try {
      const res = await ElasticsearchClient.search({
        index: ElasticSearchIndices.DailyReport,
        body: {
          query: {
            multi_match: {
              query: searchString.toLowerCase(),
              type: "cross_fields",
              fields: [
                "jobsiteName",
                "jobsiteCode",
                "crewName^2",
                // "date",
              ],
            },
          },
        },
        size: options?.limit,
      });

      let dailyReportObjects: { id: string; score: number }[] =
        res.body.hits.hits.map((item: any) => {
          return {
            id: item._id,
            score: item._score,
          };
        });

      // Filter out blacklisted ids
      if (options?.blacklistedIds) {
        dailyReportObjects = dailyReportObjects.filter(
          (object) => !options.blacklistedIds?.includes(object.id)
        );
      }

      const dailyReports: IDailyReportSearchObject[] = [];
      for (let i = 0; i < dailyReportObjects.length; i++) {
        const dailyReport = await DailyReport.getById(dailyReportObjects[i].id);
        if (dailyReport)
          dailyReports.push({
            dailyReport,
            score: dailyReportObjects[i].score,
          });
      }

      resolve(dailyReports);
    } catch (e) {
      reject(e);
    }
  });
};

const listDefaultOptions: IListOptions<DailyReportDocument> = {
  pageLimit: 25,
  offset: 0,
};
const list = (
  DailyReport: DailyReportModel,
  options?: IListOptions<DailyReportDocument>
) => {
  return new Promise<DailyReportDocument[]>(async (resolve, reject) => {
    try {
      options = populateOptions(options, listDefaultOptions);

      const dailyReports = await DailyReport.find(
        options?.query || {},
        undefined,
        {
          limit: options?.pageLimit,
          skip: options?.offset,
          sort: {
            date: -1,
          },
        }
      );

      resolve(dailyReports);
    } catch (e) {
      reject(e);
    }
  });
};

const existingReport = (
  DailyReport: DailyReportModel,
  jobsiteId: Id,
  crewId: Id,
  date: Date
) => {
  return new Promise<DailyReportDocument | null>(async (resolve, reject) => {
    try {
      const dailyReport = await DailyReport.findOne({
        crew: crewId,
        jobsite: jobsiteId,
        date: {
          $gte: dayjs(date).startOf("day").toDate(),
          $lt: dayjs(date).endOf("day").toDate(),
        },
      });

      resolve(dailyReport);
    } catch (e) {
      reject(e);
    }
  });
};

const byJobsiteDayReport = (
  DailyReport: DailyReportModel,
  jobsiteDayReport: JobsiteDayReportDocument
) => {
  return new Promise<DailyReportDocument[]>(async (resolve, reject) => {
    try {
      if (!jobsiteDayReport.jobsite || !jobsiteDayReport.date)
        throw new Error("jobsiteDayReport does not have the correct fields");

      const startOfDay = dayjs(jobsiteDayReport.date).startOf("day").toDate();
      const endOfDay = dayjs(jobsiteDayReport.date).endOf("day").toDate();

      const dailyReports = await DailyReport.find({
        date: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
        jobsite: jobsiteDayReport.jobsite,
        approved: true,
      });

      resolve(dailyReports);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * ----- Methods -----
 */

const jobsite = (dailyReport: DailyReportDocument) => {
  return new Promise<JobsiteDocument>(async (resolve, reject) => {
    try {
      if (!dailyReport.jobsite)
        throw new Error(
          "dailyReport.getJobsite: report does not contain a jobsite"
        );

      const jobsite = await Jobsite.getById(dailyReport.jobsite);

      if (!jobsite)
        throw new Error(
          "dailyReport.getJobsite: unable to find linked jobsite"
        );

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

const crew = (dailyReport: DailyReportDocument) => {
  return new Promise<CrewDocument>(async (resolve, reject) => {
    try {
      if (!dailyReport.crew)
        throw new Error("dailyReport.getCrew: report does not contain a crew");

      const crew = await Crew.getById(dailyReport.crew);

      if (!crew)
        throw new Error("dailyReport.getCrew: unable to find linked crew");

      resolve(crew);
    } catch (e) {
      reject(e);
    }
  });
};

const employeeWork = (dailyReport: DailyReportDocument) => {
  return new Promise<EmployeeWorkDocument[]>(async (resolve, reject) => {
    try {
      const employeeWork = await EmployeeWork.find({
        _id: { $in: dailyReport.employeeWork },
      });

      resolve(employeeWork);
    } catch (e) {
      reject(e);
    }
  });
};

const vehicleWork = (dailyReport: DailyReportDocument) => {
  return new Promise<VehicleWorkDocument[]>(async (resolve, reject) => {
    try {
      const vehicleWork = await VehicleWork.find({
        _id: { $in: dailyReport.vehicleWork },
      });

      resolve(vehicleWork);
    } catch (e) {
      reject(e);
    }
  });
};

const production = (dailyReport: DailyReportDocument) => {
  return new Promise<ProductionDocument[]>(async (resolve, reject) => {
    try {
      const production = await Production.find({
        _id: { $in: dailyReport.production },
      });

      resolve(production);
    } catch (e) {
      reject(e);
    }
  });
};

const materialShipments = (dailyReport: DailyReportDocument) => {
  return new Promise<MaterialShipmentDocument[]>(async (resolve, reject) => {
    try {
      const materialShipments = await MaterialShipment.find({
        _id: { $in: dailyReport.materialShipment },
      });

      resolve(materialShipments);
    } catch (e) {
      reject(e);
    }
  });
};

const reportNote = (dailyReport: DailyReportDocument) => {
  return new Promise<ReportNoteDocument | null>(async (resolve, reject) => {
    try {
      if (dailyReport.reportNote) {
        const reportNote = await ReportNote.getById(dailyReport.reportNote);

        resolve(reportNote);
      } else resolve(null);
    } catch (e) {
      reject(e);
    }
  });
};

const temporaryEmployees = (dailyReport: DailyReportDocument) => {
  return new Promise<EmployeeDocument[]>(async (resolve, reject) => {
    try {
      const employees = await Employee.find({
        _id: { $in: dailyReport.temporaryEmployees },
      });

      resolve(employees);
    } catch (e) {
      reject(e);
    }
  });
};

const temporaryVehicles = (dailyReport: DailyReportDocument) => {
  return new Promise<VehicleDocument[]>(async (resolve, reject) => {
    try {
      const vehicles = await Vehicle.find({
        _id: { $in: dailyReport.temporaryVehicles },
      });

      resolve(vehicles);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  search,
  list,
  existingReport,
  byJobsiteDayReport,
  jobsite,
  crew,
  employeeWork,
  vehicleWork,
  production,
  materialShipments,
  reportNote,
  temporaryEmployees,
  temporaryVehicles,
};
