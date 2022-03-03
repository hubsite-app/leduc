import { Employee, EmployeeWorkDocument, EmployeeWorkModel } from "@models";
import { IEmployeeWorkCreate } from "@typescript/employeeWork";
import { Id } from "@typescript/models";
import isEmpty from "@utils/isEmpty";

const document = (
  EmployeeWork: EmployeeWorkModel,
  data: IEmployeeWorkCreate
) => {
  return new Promise<EmployeeWorkDocument>(async (resolve, reject) => {
    try {
      // validate employee
      const employee = await Employee.getById(data.employeeId);
      if (!employee)
        throw new Error("EmployeeWork.createDocument: unable to find employee");

      if (!isEmpty(data.jobTitle)) {
        const employeeWork = new EmployeeWork({
          jobTitle: data.jobTitle,
          startTime: data.startTime,
          endTime: data.endTime,
          employee: data.employeeId,
        });

        await data.dailyReport.addEmployeeWork(employeeWork);

        resolve(employeeWork);
      } else
        throw new Error(
          "EmployeeWork.createDocument: must provide a valid job title"
        );
    } catch (e) {
      reject(e);
    }
  });
};

const perEmployee = (
  EmployeeWork: EmployeeWorkModel,
  data: Omit<IEmployeeWorkCreate, "employeeId">,
  employees: Id[]
) => {
  return new Promise<EmployeeWorkDocument[]>(async (resolve, reject) => {
    try {
      const employeeWorks: EmployeeWorkDocument[] = [];

      if (employees.length === 0)
        throw new Error(
          "EmployeeWork.createPerEmployee: must provide an employees array"
        );

      for (let i = 0; i < employees.length; i++) {
        employeeWorks.push(
          await EmployeeWork.createDocument({
            ...data,
            employeeId: employees[i],
          })
        );
      }

      resolve(employeeWorks);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
  perEmployee,
};
