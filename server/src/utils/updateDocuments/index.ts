import updateDailyReport from "./dailyReport";
import updateEmployeeWork from "./employeeWork";
import updateMaterialShipment from "./materialShipment";
import updateProduction from "./production";
import updateUser from "./user";

const updateDocuments = async () => {
  await updateEmployeeWork();
  await updateDailyReport();
  await updateProduction();
  await updateMaterialShipment();
  await updateUser();

  return;
};

export default updateDocuments;
