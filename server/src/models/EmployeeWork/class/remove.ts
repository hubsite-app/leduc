import { EmployeeWorkDocument } from "@models";

const fullDelete = (employeeWork: EmployeeWorkDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const dailyReport = await employeeWork.getDailyReport();

      if (dailyReport) {
        await dailyReport.removeEmployeeWork(employeeWork);

        await dailyReport.save();
      }

      await employeeWork.remove();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  fullDelete,
};
