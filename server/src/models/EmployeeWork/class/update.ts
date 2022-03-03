import { EmployeeWorkDocument } from "@models";
import { IEmployeeWorkUpdate } from "@typescript/employeeWork";
import dayjs from "dayjs";

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

const date = (employeeWork: EmployeeWorkDocument, date: Date) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const year = dayjs(date).get("year");
      const month = dayjs(date).get("month");
      const day = dayjs(date).get("date");

      employeeWork.startTime = dayjs(employeeWork.startTime)
        .set("year", year)
        .set("month", month)
        .set("date", day)
        .toDate();
      employeeWork.endTime = dayjs(employeeWork.endTime)
        .set("year", year)
        .set("month", month)
        .set("date", day)
        .toDate();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
  date,
};
