import updateDailyReport from "./dailyReport";
import updateEmployeeWork from "./employeeWork";
import updateJobsites from "./jobsite";
import updateMaterialShipment from "./materialShipment";
import updateProduction from "./production";

const updateDocuments = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await updateEmployeeWork();
      await updateDailyReport();
      await updateProduction();
      await updateMaterialShipment();
      await updateJobsites();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default updateDocuments;
