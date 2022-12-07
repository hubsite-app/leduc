import updateDailyReport from "./dailyReport";
import updateEmployeeWork from "./employeeWork";
import updateJobsiteMaterials from "./jobsiteMaterial";
import updateMaterialShipment from "./materialShipment";
import updateProduction from "./production";
import updateSystem from "./system";
import updateUser from "./user";
import updateVehicleWork from "./vehicleWork";

const updateDocuments = async () => {
  await updateEmployeeWork();
  await updateVehicleWork();
  await updateDailyReport();
  await updateProduction();
  await updateMaterialShipment();
  await updateUser();
  await updateJobsiteMaterials();
  await updateSystem();

  return;
};

export default updateDocuments;
