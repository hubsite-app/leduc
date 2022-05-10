import { VehicleDocument, CrewDocument } from "@models";
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

const archive = async (
  vehicle: VehicleDocument
): Promise<{ crews: CrewDocument[] }> => {
  vehicle.archivedAt = new Date();

  const crews = await vehicle.getCrews();

  for (let i = 0; i < crews.length; i++) {
    await crews[i].removeVehicle(vehicle._id);
  }

  return { crews };
};

export default {
  document,
  rates,
  archive,
};
