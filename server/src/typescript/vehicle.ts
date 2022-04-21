import { VehicleDocument } from "@models";

export interface IVehicleCreate {
  name: string;
  vehicleCode: string;
  vehicleType: string;
  rental?: boolean;
  sourceCompany?: string;
}

export interface IVehicleUpdate {
  name: string;
  vehicleType: string;
}

export interface IVehicleSearchObject {
  score: number;
  vehicle: VehicleDocument;
}
