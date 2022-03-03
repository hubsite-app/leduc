import {
  Vehicle,
  VehicleDocument,
  VehicleWorkDocument,
  VehicleWorkModel,
} from "@models";
import { GetByIDOptions, Id } from "@typescript/models";
import populateOptions from "@utils/populateOptions";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  VehicleWork: VehicleWorkModel,
  id: Id,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<VehicleWorkDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const vehicleWork = await VehicleWork.findById(id);

      if (!vehicleWork && options.throwError) {
        throw new Error("VehicleWork.getById: Unable to find vehicle work");
      }

      resolve(vehicleWork);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * ----- Methods -----
 */

const vehicle = (vehicleWork: VehicleWorkDocument) => {
  return new Promise<VehicleDocument>(async (resolve, reject) => {
    try {
      if (!vehicleWork.vehicle)
        throw new Error("vehicleWork.getVehicle: does not contain a vehicle");

      const vehicle = await Vehicle.getById(vehicleWork.vehicle);

      if (!vehicle)
        throw new Error("vehicleWork.getVehicle: could not find vehicle");

      resolve(vehicle);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  vehicle,
};
