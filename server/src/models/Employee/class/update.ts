import { EmployeeDocument } from "@models";
import { IEmployeeUpdate } from "@typescript/employee";
import { IRatesData } from "@typescript/models";
import validateRates from "@validation/validateRates";

const document = async (employee: EmployeeDocument, data: IEmployeeUpdate) => {
  employee.name = data.name;

  employee.jobTitle = data.jobTitle;

  return;
};

const rates = async (employee: EmployeeDocument, data: IRatesData[]) => {
  await validateRates(data);

  employee.rates = data;

  return;
};

export default {
  document,
  rates,
};
