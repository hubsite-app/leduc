import { EmployeeDocument, EmployeeModel } from "@models";
import { IEmployeeCreate } from "@typescript/employee";

const document = (Employee: EmployeeModel, data: IEmployeeCreate) => {
  return new Promise<EmployeeDocument>(async (resolve, reject) => {
    try {
      const sameName = await Employee.getByName(data.name);
      if (sameName)
        throw new Error(
          "Employee.createDocument: employee already exists with this name"
        );

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
