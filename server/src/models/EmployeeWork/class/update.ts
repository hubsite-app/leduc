import { EmployeeWorkDocument } from "@models";
import { IEmployeeWorkUpdate } from "@typescript/employeeWork";

const document = (
  employeeWork: EmployeeWorkDocument,
  data: IEmployeeWorkUpdate
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      employeeWork.jobTitle = data.jobTitle;

      employeeWork.startTime = data.startTime;

      employeeWork.endTime = data.endTime;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
