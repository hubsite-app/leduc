import { SystemDocument } from "@models";
import { IDefaultRateData } from "@typescript/models";

const unitDefaults = (system: SystemDocument, units: string[]) => {
  return new Promise<SystemDocument>(async (resolve, reject) => {
    try {
      system.unitDefaults = units;

      resolve(system);
    } catch (e) {
      reject(e);
    }
  });
};

const laborTypes = (system: SystemDocument, types: string[]) => {
  return new Promise<void>((resolve, reject) => {
    try {
      system.laborTypes = types;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const companyVehicleTypeDefaults = (
  system: SystemDocument,
  data: IDefaultRateData[]
) => {
  return new Promise<SystemDocument>(async (resolve, reject) => {
    try {
      system.companyVehicleTypeDefaults = data;

      resolve(system);
    } catch (e) {
      reject(e);
    }
  });
};

const materialShipmentVehicleTypeDefaults = (
  system: SystemDocument,
  data: IDefaultRateData[]
) => {
  return new Promise<SystemDocument>(async (resolve, reject) => {
    try {
      system.materialShipmentVehicleTypeDefaults = data;

      resolve(system);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  unitDefaults,
  laborTypes,
  companyVehicleTypeDefaults,
  materialShipmentVehicleTypeDefaults,
};
