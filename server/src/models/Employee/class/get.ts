import { Types } from "mongoose";

import {
  Crew,
  CrewDocument,
  EmployeeDocument,
  EmployeeModel,
  Signup,
  SignupDocument,
  User,
  UserDocument,
} from "@models";
import { GetByIDOptions, ISearchOptions } from "@typescript/models";
import populateOptions from "@utils/populateOptions";
import ElasticsearchClient from "@elasticsearch/client";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";
import { IEmployeeSearchObject } from "@typescript/employee";

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
  return new Promise<IEmployeeSearchObject[]>(async (resolve, reject) => {
    try {
      const res = await ElasticsearchClient.search({
        index: ElasticSearchIndices.Employee,
        body: {
          query: {
            multi_match: {
              query: searchString.toLowerCase(),
              fuzziness: "AUTO",
              fields: ["name", "jobTitle"],
            },
          },
        },
        size: options?.limit,
      });

      let employeeObjects: { id: string; score: number }[] =
        res.body.hits.hits.map((item: any) => {
          return {
            id: item._id,
            score: item._score,
          };
        });

      // Filter out blacklisted ids
      if (options?.blacklistedIds) {
        employeeObjects = employeeObjects.filter(
          (object) => !options.blacklistedIds?.includes(object.id)
        );
      }

      const employees: IEmployeeSearchObject[] = [];
      for (let i = 0; i < employeeObjects.length; i++) {
        const employee = await Employee.getById(employeeObjects[i].id);
        if (employee)
          employees.push({
            employee,
            score: employeeObjects[i].score,
          });
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

const signup = (employee: EmployeeDocument) => {
  return new Promise<SignupDocument | null>(async (resolve, reject) => {
    try {
      const signup = await Signup.getByEmployee(employee._id);

      resolve(signup);
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
  signup,
};
