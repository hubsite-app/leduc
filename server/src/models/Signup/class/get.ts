import {
  Employee,
  EmployeeDocument,
  SignupDocument,
  SignupModel,
} from "@models";
import { GetByIDOptions, Id } from "@typescript/models";
import populateOptions from "@utils/populateOptions";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  Signup: SignupModel,
  id: Id,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<SignupDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const signup = await Signup.findById(id);

      if (!signup && options.throwError) {
        throw new Error("Signup.getById: unable to find report note");
      }

      resolve(signup);
    } catch (e) {
      reject(e);
    }
  });
};

const byEmployee = (Signup: SignupModel, employeeId: Id) => {
  return new Promise<SignupDocument | null>(async (resolve, reject) => {
    try {
      const signup = await Signup.findOne({ employee: employeeId });

      resolve(signup);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * ----- Methods -----
 */

const employee = (signup: SignupDocument) => {
  return new Promise<EmployeeDocument>(async (resolve, reject) => {
    try {
      const employee = await Employee.getById(signup.employee!);

      if (!employee)
        throw new Error("signup.getEmployee: unable to find employee");

      resolve(employee);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  byEmployee,
  employee,
};
