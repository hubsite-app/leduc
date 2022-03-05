import { EmployeeDocument, EmployeeModel } from "@models";
import { IEmployeeCreate } from "@typescript/employee";

const document = (Employee: EmployeeModel, data: IEmployeeCreate) => {
  return new Promise<EmployeeDocument>(async (resolve, reject) => {
    try {
      const employee = new Employee({
        ...data,
      });

      resolve(employee);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
