import { DailyReportDocument, EmployeeWorkDocument } from "@models";

const employeeWork = (
  dailyReport: DailyReportDocument,
  employeeWork: EmployeeWorkDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const workIndex = dailyReport.employeeWork.findIndex(
        (id) => id === employeeWork._id
      );

      if (workIndex !== -1) {
        dailyReport.employeeWork.splice(workIndex, 1);
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  employeeWork,
};
