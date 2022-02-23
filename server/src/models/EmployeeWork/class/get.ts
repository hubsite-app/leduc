import { Employee, EmployeeDocument, EmployeeWorkDocument } from "@models";

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

export default {
  employee,
};
