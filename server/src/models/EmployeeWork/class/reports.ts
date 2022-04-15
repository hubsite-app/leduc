import { EmployeeWorkDocument } from "@models";

const requestUpdate = (employeeWork: EmployeeWorkDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const dailyReport = await employeeWork.getDailyReport();

      await dailyReport?.requestReportUpdate();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  requestUpdate,
};
