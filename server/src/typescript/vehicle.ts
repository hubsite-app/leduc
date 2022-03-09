export interface IVehicleCreate {
  name: string;
  vehicleCode: string;
  vehicleType: string;
  rental?: boolean;
  sourceCompany?: string;
}
