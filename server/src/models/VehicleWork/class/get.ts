import { Vehicle, VehicleDocument, VehicleWorkDocument } from "@models";

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
  vehicle,
};
