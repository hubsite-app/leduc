import updateDailyReport from "./dailyReport";
import updateEmployeeWork from "./employeeWork";

const updateDocuments = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await updateEmployeeWork();
      await updateDailyReport();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default updateDocuments;
