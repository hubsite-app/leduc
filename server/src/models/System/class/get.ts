import { SystemModel, SystemDocument } from "@models";

const system = (System: SystemModel) => {
  return new Promise<SystemDocument>(async (resolve, reject) => {
    try {
      const system = (await System.find().limit(1))[0];

      resolve(system);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  system,
};
