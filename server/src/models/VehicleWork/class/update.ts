import { VehicleWorkDocument } from "@models";
import { IVehicleWorkUpdate } from "@typescript/vehicleWork";

const document = async (
  vehicleWork: VehicleWorkDocument,
  data: IVehicleWorkUpdate
) => {
  vehicleWork.jobTitle = data.jobTitle;

  vehicleWork.hours = data.hours;

  return;
};

export default {
  document,
};
