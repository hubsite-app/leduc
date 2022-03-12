import { logger } from "@logger";
import { DailyReport, Employee, Jobsite, Vehicle } from "@models";
import isEmpty from "@utils/isEmpty";

const saveAll = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Employee
      const employees = await Employee.find();
      logger.info(`Saving ${employees.length} employee documents`);
      for (let i = 0; i < employees.length; i++) {
        await employees[i].save();
      }

      // Vehicle
      const vehicles = await Vehicle.find();
      logger.info(`Saving ${vehicles.length} vehicle documents`);
      for (let i = 0; i < vehicles.length; i++) {
        await vehicles[i].save();
      }

      // Jobsite
      const jobsites = await Jobsite.find();
      logger.info(`Saving ${jobsites.length} jobsite documents`);
      for (let i = 0; i < jobsites.length; i++) {
        await jobsites[i].save();
      }

      // DailyReport
      const dailyReports = await DailyReport.find();
      logger.info(`Saving ${dailyReports.length} dailyReport documents`);
      for (let i = 0; i < dailyReports.length; i++) {
        if (isEmpty(dailyReports[i].reportNote)) {
          dailyReports[i].reportNote = undefined;
        }

        await dailyReports[i].save();
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default saveAll;
