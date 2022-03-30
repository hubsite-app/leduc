import { VehicleDocument } from "@models";
import { IRatesData } from "@typescript/models";
import validateRates from "@validation/validateRates";

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
  rates,
};
