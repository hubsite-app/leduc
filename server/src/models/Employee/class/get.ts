import { Types } from "mongoose";

import {
  Crew,
  CrewDocument,
  EmployeeDocument,
  EmployeeModel,
  User,
  UserDocument,
} from "@models";
import { GetByIDOptions, ISearchOptions } from "@typescript/models";
import populateOptions from "@utils/populateOptions";
import ElasticsearchClient from "@elasticsearch/client";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

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

const search = (
  Employee: EmployeeModel,
  searchString: string,
  options?: ISearchOptions
) => {
  return new Promise<EmployeeDocument[]>(async (resolve, reject) => {
    try {
      const res = await ElasticsearchClient.search({
        index: ElasticSearchIndices.Employee,
        body: {
          query: {
            multi_match: {
              query: searchString.toLowerCase(),
              fuzziness: "AUTO",
              fields: ["employee.name^2", "employee.jobTitle"],
            },
          },
        },
        size: options?.limit,
      });

      let employeeIds: string[] = res.body.hits.hits.map(
        (item: any) => item._id
      );

      // Filter out blacklisted ids
      if (options?.blacklistedIds) {
        employeeIds = employeeIds.filter(
          (id) => !options.blacklistedIds?.includes(id)
        );
      }

      const employees: EmployeeDocument[] = [];
      for (let i = 0; i < employeeIds.length; i++) {
        const employee = await Employee.getById(employeeIds[i]);
        if (employee) employees.push(employee);
      }

      resolve(employees);
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

const byName = (Employee: EmployeeModel, name: string) => {
  return new Promise<EmployeeDocument | null>(async (resolve, reject) => {
    try {
      const employee = await Employee.findOne({
        name: { $regex: new RegExp(name, "i") },
      });

      resolve(employee);
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
  search,
  byName,
  list,
  user,
  crews,
};
