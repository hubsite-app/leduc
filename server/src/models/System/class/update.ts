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
  companyVehicleTypeDefaults,
  materialShipmentVehicleTypeDefaults,
};
