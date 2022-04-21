import { VehicleDocument, VehicleModel } from "@models";
import { IVehicleCreate } from "@typescript/vehicle";

const document = (Vehicle: VehicleModel, data: IVehicleCreate) => {
  return new Promise<VehicleDocument>(async (resolve, reject) => {
    try {
      const sameCode = await Vehicle.getByCode(data.vehicleCode);
      if (sameCode)
        throw new Error(
          "Vehicle.createDocument: a vehicle already exists with this code"
        );

      const vehicle = new Vehicle({
        ...data,
      });

      resolve(vehicle);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
