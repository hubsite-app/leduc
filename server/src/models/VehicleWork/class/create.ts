import { Vehicle, VehicleWorkDocument, VehicleWorkModel } from "@models";
import { Id } from "@typescript/models";
import { IVehicleWorkCreate } from "@typescript/vehicleWork";

const document = (VehicleWork: VehicleWorkModel, data: IVehicleWorkCreate) => {
  return new Promise<VehicleWorkDocument>(async (resolve, reject) => {
    try {
      // validate vehicle
      const vehicle = await Vehicle.getById(data.vehicleId);
      if (!vehicle)
        throw new Error("VehicleWork.createDocument: unable to find vehicle");

      const vehicleWork = new VehicleWork({
        jobTitle: data.jobTitle,
        hours: data.hours,
        vehicle: data.vehicleId,
      });

      await data.dailyReport.addVehicleWork(vehicleWork);

      resolve(vehicleWork);
    } catch (e) {
      reject(e);
    }
  });
};

const perVehicle = (
  VehicleWork: VehicleWorkModel,
  data: Omit<IVehicleWorkCreate, "vehicleId">,
  vehicles: Id[]
) => {
  return new Promise<VehicleWorkDocument[]>(async (resolve, reject) => {
    try {
      const vehicleWorks: VehicleWorkDocument[] = [];

      if (vehicles.length === 0)
        throw new Error(
          "VehicleWork.createPerVehicle: must provide a vehicles array"
        );

      for (let i = 0; i < vehicles.length; i++) {
        vehicleWorks.push(
          await VehicleWork.createDocument({
            ...data,
            vehicleId: vehicles[i],
          })
        );
      }

      resolve(vehicleWorks);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
  perVehicle,
};
