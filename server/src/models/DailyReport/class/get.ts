import { Types } from "mongoose";

import {
  Crew,
  CrewDocument,
  DailyReportDocument,
  DailyReportModel,
  EmployeeWork,
  EmployeeWorkDocument,
  Jobsite,
  JobsiteDocument,
  MaterialShipment,
  MaterialShipmentDocument,
  Production,
  ProductionDocument,
  ReportNote,
  ReportNoteDocument,
  VehicleWork,
  VehicleWorkDocument,
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

const list = (DailyReport: DailyReportModel) => {
  return new Promise<DailyReportDocument[]>(async (resolve, reject) => {
    try {
      const dailyReports = await DailyReport.find({});

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

const reportNotes = (dailyReport: DailyReportDocument) => {
  return new Promise<ReportNoteDocument[]>(async (resolve, reject) => {
    try {
      const reportNotes = await ReportNote.find({
        _id: { $in: dailyReport.reportNote },
      });

      resolve(reportNotes);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  list,
  jobsite,
  crew,
  employeeWork,
  vehicleWork,
  production,
  materialShipments,
  reportNotes,
};
