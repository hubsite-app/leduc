import { logger } from "@logger";
import {
  Crew,
  DailyReport,
  Employee,
  Jobsite,
  Material,
  Vehicle,
} from "@models";
import isEmpty from "@utils/isEmpty";

const saveAll = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      console.log("Saving all documents");

      // // Employee
      // const employees = await Employee.find();
      // logger.info(`Saving ${employees.length} employee documents`);
      // for (let i = 0; i < employees.length; i++) {
      //   await employees[i].save();
      // }

      // // Vehicle
      // const vehicles = await Vehicle.find();
      // logger.info(`Saving ${vehicles.length} vehicle documents`);
      // for (let i = 0; i < vehicles.length; i++) {
      //   await vehicles[i].save();
      // }

      // // Jobsite
      // const jobsites = await Jobsite.find();
      // logger.info(`Saving ${jobsites.length} jobsite documents`);
      // for (let i = 0; i < jobsites.length; i++) {
      //   await jobsites[i].save();
      // }

      // // DailyReport
      // const dailyReports = await DailyReport.find();
      // logger.info(`Saving ${dailyReports.length} dailyReport documents`);
      // for (let i = 0; i < dailyReports.length; i++) {
      //   if (isEmpty(dailyReports[i].reportNote)) {
      //     dailyReports[i].reportNote = undefined;
      //   }

      //   await dailyReports[i].save();
      // }

      // // Crew
      // const crews = await Crew.find();
      // logger.info(`Saving ${crews.length} crew documents`);
      // for (let i = 0; i < crews.length; i++) {
      //   await crews[i].save();
      // }

      // Material
      const materials = await Material.find();
      logger.info(`Saving ${materials.length} material documents`);
      for (let i = 0; i < materials.length; i++) {
        await materials[i].save();
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default saveAll;
