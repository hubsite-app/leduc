import { Types } from "mongoose";

import {
  CrewDocument,
  CrewModel,
  Employee,
  EmployeeDocument,
  Jobsite,
  JobsiteDocument,
  Vehicle,
  VehicleDocument,
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
  Crew: CrewModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<CrewDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const crew = await Crew.findById(id);

      if (!crew && options.throwError) {
        throw new Error("Crew.getById: unable to find crew");
      }

      resolve(crew);
    } catch (e) {
      reject(e);
    }
  });
};

const list = (Crew: CrewModel) => {
  return new Promise<CrewDocument[]>(async (resolve, reject) => {
    try {
      const crews = await Crew.find({});

      resolve(crews);
    } catch (e) {
      reject(e);
    }
  });
};

const byVehicle = (Crew: CrewModel, vehicle: VehicleDocument) => {
  return new Promise<CrewDocument[]>(async (resolve, reject) => {
    try {
      const crews = await Crew.find({ vehicles: vehicle._id });

      resolve(crews);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * ----- Methods -----
 */

const employees = (crew: CrewDocument) => {
  return new Promise<EmployeeDocument[]>(async (resolve, reject) => {
    try {
      const employees: EmployeeDocument[] = await Employee.find({
        _id: { $in: crew.employees },
      });

      resolve(employees);
    } catch (e) {
      reject(e);
    }
  });
};

const vehicles = (crew: CrewDocument) => {
  return new Promise<VehicleDocument[]>(async (resolve, reject) => {
    try {
      const vehicles = await Vehicle.find({ _id: { $in: crew.vehicles } });

      resolve(vehicles);
    } catch (e) {
      reject(e);
    }
  });
};

const jobsites = (crew: CrewDocument) => {
  return new Promise<JobsiteDocument[]>(async (resolve, reject) => {
    try {
      const jobsites = await Jobsite.getByCrew(crew);

      resolve(jobsites);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  list,
  byVehicle,
  employees,
  vehicles,
  jobsites,
};
