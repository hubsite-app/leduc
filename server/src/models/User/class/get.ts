import { Types } from "mongoose";

import { Employee, EmployeeDocument, UserDocument, UserModel } from "@models";
import { GetByIDOptions } from "@typescript/models";
import populateOptions from "@utils/populateOptions";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  User: UserModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<UserDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const user = await User.findById(id);

      if (!user && options.throwError) {
        throw new Error("User.getById: Unable to find user");
      }

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * ----- Methods -----
 */

const employee = (user: UserDocument) => {
  return new Promise<EmployeeDocument | null>(async (resolve, reject) => {
    try {
      let employee: EmployeeDocument | null = null;

      if (user.employee) {
        employee = await Employee.getById(user.employee);
      }

      resolve(employee);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  employee,
};
