import { Employee, SignupDocument, SignupModel } from "@models";
import { Id } from "@typescript/models";

const document = (Signup: SignupModel, employeeId: Id) => {
  return new Promise<SignupDocument>(async (resolve, reject) => {
    try {
      const existingSignup = await Signup.getByEmployee(employeeId);
      if (existingSignup) await existingSignup.remove();

      const employee = await Employee.getById(employeeId);
      if (!employee)
        throw new Error("Signup.createDocument: unable to find employee");

      const signup = new Signup({
        employee: employee._id,
      });

      resolve(signup);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
