import { SystemModel, SystemDocument } from "@models";

const document = (System: SystemModel) => {
  return new Promise<SystemDocument>(async (resolve, reject) => {
    try {
      const systems = await System.find();
      if (systems.length > 0)
        throw new Error("Can only create a single System document");

      const system = new System({
        unitDefaults: ["tonnes", "m2", "inches", "cm"],
        companyVehicleTypeDefaults: [
          {
            title: "Tandem",
            rate: 82,
          },
          {
            title: "Lowboy",
            rate: 203,
          },
        ],
        materialShipmentVehicleTypeDefaults: [
          {
            title: "Tandem",
            rate: 90,
          },
          {
            title: "Truck and Pup",
            rate: 120,
          },
          {
            title: "Truck and Tri",
            rate: 130,
          },
          {
            title: "Truck and Wagon",
            rate: 145,
          },
          {
            title: "Tandem BM",
            rate: 82,
          },
          {
            title: "Truck and Pup BM",
            rate: 111,
          },
          {
            title: "Truck and Tri BM",
            rate: 120,
          },
          {
            title: "Tractor/Lowboy BM",
            rate: 203,
          },
        ],
      });

      await system.save();

      resolve(system);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
