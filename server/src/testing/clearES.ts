import { ES_clearCompany } from "@elasticsearch/helpers/company";
import { ES_clearCrew } from "@elasticsearch/helpers/crew";
import { ES_clearDailyReport } from "@elasticsearch/helpers/dailyReport";
import { ES_clearEmployee } from "@elasticsearch/helpers/employee";
import { ES_clearJobsite } from "@elasticsearch/helpers/jobsite";
import { ES_clearMaterial } from "@elasticsearch/helpers/material";
import { ES_clearVehicle } from "@elasticsearch/helpers/vehicle";

const clearES = async () => {
  await ES_clearCompany();
  await ES_clearCrew();
  await ES_clearDailyReport();
  await ES_clearEmployee();
  await ES_clearJobsite();
  await ES_clearMaterial();
  await ES_clearVehicle();

  return;
};

export default clearES;
