import { ES_ensureEmployeeIndex } from "./helpers/employee";
import { ES_ensureVehicleIndex } from "./helpers/vehicle";

const elasticsearch = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await ES_ensureEmployeeIndex();

      await ES_ensureVehicleIndex();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default elasticsearch;
