import { Types } from "mongoose";

import {
  DailyReport,
  DailyReportDocument,
  Employee,
  EmployeeDocument,
  EmployeeWorkDocument,
  EmployeeWorkModel,
} from "@models";
import { GetByIDOptions } from "@typescript/models";
import populateOptions from "@utils/populateOptions";

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  EmployeeWork: EmployeeWorkModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<EmployeeWorkDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const employeeWork = await EmployeeWork.findById(id);

      if (!employeeWork && options.throwError) {
        throw new Error("EmployeeWork.getById: unable to find employee work");
      }

      resolve(employeeWork);
    } catch (e) {
      reject(e);
    }
  });
};

const employee = (employeeWork: EmployeeWorkDocument) => {
  return new Promise<EmployeeDocument>(async (resolve, reject) => {
    try {
      if (!employeeWork.employee)
        throw new Error(
          "employeeWork.getEmployee: does not contain an employee"
        );

      const employee = await Employee.getById(employeeWork.employee);

      if (!employee)
        throw new Error("employeeWork.getEmployee: unable to find employee");

      resolve(employee);
    } catch (e) {
      reject(e);
    }
  });
};

const dailyReport = (employeeWork: EmployeeWorkDocument) => {
  return new Promise<DailyReportDocument | null>(async (resolve, reject) => {
    try {
      const dailyReport = await DailyReport.findOne({
        employeeWork: employeeWork._id,
      });

      resolve(dailyReport);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  employee,
  dailyReport,
};
