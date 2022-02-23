import { Types } from "mongoose";

import {
  Crew,
  CrewDocument,
  EmployeeDocument,
  EmployeeModel,
  User,
  UserDocument,
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
  Employee: EmployeeModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<EmployeeDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const employee = await Employee.findById(id);

      if (!employee && options.throwError) {
        throw new Error("Employee.getById: unable to find employee");
      }

      resolve(employee);
    } catch (e) {
      reject(e);
    }
  });
};

const list = (Employee: EmployeeModel) => {
  return new Promise<EmployeeDocument[]>(async (resolve, reject) => {
    try {
      const employees = await Employee.find({});

      resolve(employees);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * ----- Methods -----
 */

const user = (employee: EmployeeDocument) => {
  return new Promise<UserDocument | null>(async (resolve, reject) => {
    try {
      const user = await User.findOne({ employee: employee._id });

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

const crews = (employee: EmployeeDocument) => {
  return new Promise<CrewDocument[]>(async (resolve, reject) => {
    try {
      const crews = await Crew.find({ employees: employee._id });

      resolve(crews);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  list,
  user,
  crews,
};
