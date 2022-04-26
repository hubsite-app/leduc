import { VehicleDocument } from "@models";
import { IRatesData } from "@typescript/models";
import { IVehicleUpdate } from "@typescript/vehicle";
import validateRates from "@validation/validateRates";

const document = async (vehicle: VehicleDocument, data: IVehicleUpdate) => {
  vehicle.name = data.name;

  vehicle.vehicleType = data.vehicleType;

  return;
};

const rates = async (vehicle: VehicleDocument, data: IRatesData[]) => {
  await validateRates(data);

  vehicle.rates = data;

  return;
};

export default {
  document,
  rates,
};
