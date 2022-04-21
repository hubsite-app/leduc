import { DefaultRateData } from "@graphql/types/mutation";
import { System, SystemDocument } from "@models";

const unitDefaults = (data: string[]) => {
  return new Promise<SystemDocument>(async (resolve, reject) => {
    try {
      const system = await System.getSystem();

      await system.updateUnitDefaults(data);

      await system.save();

      resolve(system);
    } catch (e) {
      reject(e);
    }
  });
};

const companyVehicleTypeDefaults = (data: DefaultRateData[]) => {
  return new Promise<SystemDocument>(async (resolve, reject) => {
    try {
      const system = await System.getSystem();

      await system.updateCompanyVehicleTypeDefaults(data);

      await system.save();

      resolve(system);
    } catch (e) {
      reject(e);
    }
  });
};

const materialShipmentVehicleTypeDefaults = (data: DefaultRateData[]) => {
  return new Promise<SystemDocument>(async (resolve, reject) => {
    try {
      const system = await System.getSystem();

      await system.updateMaterialShipmentVehicleTypeDefaults(data);

      await system.save();

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
