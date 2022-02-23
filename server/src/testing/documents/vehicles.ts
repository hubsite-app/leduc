import { Vehicle, VehicleDocument } from "@models";
import _ids from "@testing/_ids";

export interface SeededVehicles {
  personnel_truck_1: VehicleDocument;
  skidsteer_1: VehicleDocument;
  gravel_truck_1: VehicleDocument;
}

const createVehicles = () => {
  return new Promise<SeededVehicles>(async (resolve, reject) => {
    try {
      const personnel_truck_1 = new Vehicle({
        _id: _ids.vehicles.personnel_truck_1._id,
        name: "T-52",
        vehicleCode: "T-52",
        vehicleType: "1 Ton",
        crews: [_ids.crews.base_1._id],
      });

      const skidsteer_1 = new Vehicle({
        _id: _ids.vehicles.skidsteer_1._id,
        name: "G-25",
        vehicleCode: "G-25",
        vehicleType: "Skidsteer",
        crews: [_ids.crews.base_1._id],
      });

      const gravel_truck_1 = new Vehicle({
        _id: _ids.vehicles.gravel_truck_1._id,
        name: "T-12",
        vehicleCode: "T-12",
        vehicleType: "Gravel Truck",
        crews: [_ids.crews.base_1._id],
      });

      const vehicles = {
        personnel_truck_1,
        skidsteer_1,
        gravel_truck_1,
      };

      for (let i = 0; i < Object.values(vehicles).length; i++) {
        await Object.values(vehicles)[i].save();
      }

      resolve(vehicles);
    } catch (e) {
      reject(e);
    }
  });
};

export default createVehicles;
