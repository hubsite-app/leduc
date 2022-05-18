import { SystemDocument } from "@models";
import { IDefaultRateData } from "@typescript/models";

const unitDefaults = async (
  system: SystemDocument,
  units: string[]
): Promise<SystemDocument> => {
  system.unitDefaults = units;

  return system;
};

const laborTypes = async (system: SystemDocument, types: string[]) => {
  system.laborTypes = types;

  return;
};

const companyVehicleTypeDefaults = async (
  system: SystemDocument,
  data: IDefaultRateData[]
): Promise<SystemDocument> => {
  system.companyVehicleTypeDefaults = data;

  return system;
};

const materialShipmentVehicleTypeDefaults = async (
  system: SystemDocument,
  data: IDefaultRateData[]
): Promise<SystemDocument> => {
  system.materialShipmentVehicleTypeDefaults = data;

  return system;
};

const internalExpenseOverheadRate = async (
  system: SystemDocument,
  value: number
) => {
  system.internalExpenseOverheadRate = value;
};

export default {
  unitDefaults,
  laborTypes,
  companyVehicleTypeDefaults,
  materialShipmentVehicleTypeDefaults,
  internalExpenseOverheadRate,
};
