import { ES_ensureCompanyIndex } from "./helpers/company";
import { ES_ensureCrewIndex } from "./helpers/crew";
import { ES_ensureDailyReportIndex } from "./helpers/dailyReport";
import { ES_ensureEmployeeIndex } from "./helpers/employee";
import { ES_ensureJobsiteIndex } from "./helpers/jobsite";
import { ES_ensureMaterialIndex } from "./helpers/material";
import { ES_ensureVehicleIndex } from "./helpers/vehicle";

const elasticsearch = async () => {
  await ES_ensureCompanyIndex();

  await ES_ensureEmployeeIndex();

  await ES_ensureVehicleIndex();

  await ES_ensureJobsiteIndex();

  await ES_ensureDailyReportIndex();

  await ES_ensureCrewIndex();

  await ES_ensureMaterialIndex();

  return;
};

export default elasticsearch;
