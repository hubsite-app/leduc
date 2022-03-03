import { DailyReportDocument, EmployeeWorkDocument } from "@models";
import { IDailyReportUpdate } from "@typescript/dailyReport";

const document = (
  dailyReport: DailyReportDocument,
  data: IDailyReportUpdate
) => {
  return new Promise<{ employeeWork: EmployeeWorkDocument[] }>(
    async (resolve, reject) => {
      try {
        const { employeeWork } = await dailyReport.updateDate(data.date);

        resolve({ employeeWork });
      } catch (e) {
        reject(e);
      }
    }
  );
};

const date = (dailyReport: DailyReportDocument, date: Date) => {
  return new Promise<{ employeeWork: EmployeeWorkDocument[] }>(
    async (resolve, reject) => {
      try {
        dailyReport.date = date;

        const employeeWork = await dailyReport.getEmployeeWork();
        for (let i = 0; i < employeeWork.length; i++) {
          await employeeWork[i].updateDate(date);
        }

        resolve({ employeeWork });
      } catch (e) {
        reject(e);
      }
    }
  );
};

const addEmployeeWork = (
  dailyReport: DailyReportDocument,
  employeeWork: EmployeeWorkDocument
) => {
  return new Promise<void>((resolve, reject) => {
    try {
      dailyReport.employeeWork.push(employeeWork._id);

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
  date,
  addEmployeeWork,
};
