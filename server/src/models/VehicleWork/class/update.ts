import { VehicleWorkDocument } from "@models";
import { IVehicleWorkUpdate } from "@typescript/vehicleWork";

const document = (
  vehicleWork: VehicleWorkDocument,
  data: IVehicleWorkUpdate
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      vehicleWork.jobTitle = data.jobTitle;

      vehicleWork.hours = data.hours;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
