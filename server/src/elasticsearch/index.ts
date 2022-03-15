import { ES_ensureCrewIndex } from "./helpers/crew";
import { ES_ensureDailyReportIndex } from "./helpers/dailyReport";
import { ES_ensureEmployeeIndex } from "./helpers/employee";
import { ES_ensureJobsiteIndex } from "./helpers/jobsite";
import { ES_ensureVehicleIndex } from "./helpers/vehicle";

const elasticsearch = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await ES_ensureEmployeeIndex();

      await ES_ensureVehicleIndex();

      await ES_ensureJobsiteIndex();

      await ES_ensureDailyReportIndex();

      await ES_ensureCrewIndex();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default elasticsearch;
