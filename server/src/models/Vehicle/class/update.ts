import { VehicleDocument } from "@models";
import { IRatesData } from "@typescript/models";
import { IVehicleUpdate } from "@typescript/vehicle";
import validateRates from "@validation/validateRates";

const document = (vehicle: VehicleDocument, data: IVehicleUpdate) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      vehicle.name = data.name;

      vehicle.vehicleType = data.vehicleType;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const rates = (vehicle: VehicleDocument, data: IRatesData[]) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await validateRates(data);

      vehicle.rates = data;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
  rates,
};
