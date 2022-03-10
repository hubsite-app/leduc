import { VehicleDocument } from "@models";

export interface IVehicleCreate {
  name: string;
  vehicleCode: string;
  vehicleType: string;
  rental?: boolean;
  sourceCompany?: string;
}

export interface IVehicleSearchObject {
  score: number;
  vehicle: VehicleDocument;
}
