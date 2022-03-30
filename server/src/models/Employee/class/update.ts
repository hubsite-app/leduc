import { EmployeeDocument } from "@models";
import { IRatesData } from "@typescript/models";
import validateRates from "@validation/validateRates";

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
  rates,
};
