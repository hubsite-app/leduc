import { logger } from "@logger";
import { Employee, Vehicle } from "@models";

const saveAll = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Employee
      const employees = await Employee.find();
      logger.info(`Saving ${employees.length} employee documents`);
      for (let i = 0; i < employees.length; i++) {
        if (!employees[i].name) employees[i].name = "Placeholder";

        await employees[i].save();
      }

      // Vehicle
      const vehicles = await Vehicle.find();
      logger.info(`Saving ${vehicles.length} vehicle documents`);
      for (let i = 0; i < vehicles.length; i++) {
        if (!vehicles[i].name) vehicles[i].name = "Placeholder";

        await vehicles[i].save();
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default saveAll;
