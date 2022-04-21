import { EmployeeDocument } from "@models";
import { IEmployeeUpdate } from "@typescript/employee";
import { IRatesData } from "@typescript/models";
import validateRates from "@validation/validateRates";

const document = (employee: EmployeeDocument, data: IEmployeeUpdate) => {
  return new Promise<void>((resolve, reject) => {
    try {
      employee.name = data.name;

      employee.jobTitle = data.jobTitle;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const rates = (employee: EmployeeDocument, data: IRatesData[]) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await validateRates(data);

      employee.rates = data;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
  rates,
};
