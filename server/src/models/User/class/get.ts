import { Types } from "mongoose";

import { Employee, EmployeeDocument, UserDocument, UserModel } from "@models";
import { GetByIDOptions, IListOptions } from "@typescript/models";
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

const listDefaultOptions: IListOptions<UserDocument> = {
  pageLimit: 25,
  offset: 0,
};
const list = (User: UserModel, options?: IListOptions<UserDocument>) => {
  return new Promise<UserDocument[]>(async (resolve, reject) => {
    try {
      options = populateOptions(options, listDefaultOptions);

      const users = await User.find(options?.query || {}, undefined, {
        limit: options?.pageLimit,
        skip: options?.offset,
      });

      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

const byEmail = (User: UserModel, email: string) => {
  return new Promise<UserDocument | null>(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email });

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

const byResetPasswordToken = (User: UserModel, token: string) => {
  return new Promise<UserDocument | null>(async (resolve, reject) => {
    try {
      const user = await User.findOne({ resetPasswordToken: token });

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
  return new Promise<EmployeeDocument>(async (resolve, reject) => {
    try {
      if (user.employee) {
        const employee = await Employee.getById(user.employee);

        if (!employee)
          throw new Error("user.getEmployee: unable to find employee");

        resolve(employee);
      } else {
        const employee = await Employee.createDocument({
          name: user.name,
        });

        await employee.save();

        user.employee = employee._id;

        resolve(employee);
      }
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  byEmail,
  list,
  byResetPasswordToken,
  employee,
};
