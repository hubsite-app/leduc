import { MaterialShipmentDocument, Vehicle, VehicleDocument } from "@models";

const vehicle = (materialShipment: MaterialShipmentDocument) => {
  return new Promise<VehicleDocument | null>(async (resolve, reject) => {
    try {
      const vehicle = await Vehicle.getById(materialShipment.vehicle || "");

      resolve(vehicle);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  vehicle,
};
