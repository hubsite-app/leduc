import updateDailyReport from "./dailyReport";
import updateEmployeeWork from "./employeeWork";
import updateJobsiteMaterials from "./jobsiteMaterial";
import updateMaterialShipment from "./materialShipment";
import updateProduction from "./production";
import updateUser from "./user";

const updateDocuments = async () => {
  await updateEmployeeWork();
  await updateDailyReport();
  await updateProduction();
  await updateMaterialShipment();
  await updateUser();
  await updateJobsiteMaterials();

  return;
};

export default updateDocuments;
