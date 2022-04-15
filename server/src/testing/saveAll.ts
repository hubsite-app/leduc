import { logger } from "@logger";
import {
  Company,
  Crew,
  DailyReport,
  Employee,
  Jobsite,
  Material,
  Vehicle,
} from "@models";
import isEmpty from "@utils/isEmpty";

export enum SkipSave {
  Employee,
  Vehicle,
  Jobsite,
  DailyReport,
  Crew,
  Material,
  Company,
}

const saveAll = (skip?: SkipSave[]) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      console.log("Saving all documents");

      // Employee
      if (!skip?.includes(SkipSave.Employee)) {
        const employees = await Employee.find();
        logger.info(`Saving ${employees.length} employee documents`);
        for (let i = 0; i < employees.length; i++) {
          try {
            await employees[i].save();
          } catch (e: any) {
            logger.error(`Employee Save All error: ${e.message}`);
          }
        }
      }

      // Vehicle
      if (!skip?.includes(SkipSave.Vehicle)) {
        const vehicles = await Vehicle.find();
        logger.info(`Saving ${vehicles.length} vehicle documents`);
        for (let i = 0; i < vehicles.length; i++) {
          try {
            await vehicles[i].save();
          } catch (e: any) {
            logger.error(`Vehicle Save All error: ${e.message}`);
          }
        }
      }

      // Jobsite
      if (!skip?.includes(SkipSave.Jobsite)) {
        const jobsites = await Jobsite.find();
        logger.info(`Saving ${jobsites.length} jobsite documents`);
        for (let i = 0; i < jobsites.length; i++) {
          try {
            await jobsites[i].save();
          } catch (e: any) {
            logger.error(`Jobsite Save All error: ${e.message}`);
          }
        }
      }

      // DailyReport
      if (!skip?.includes(SkipSave.DailyReport)) {
        const dailyReports = await DailyReport.find();
        logger.info(`Saving ${dailyReports.length} dailyReport documents`);
        for (let i = 0; i < dailyReports.length; i++) {
          if (isEmpty(dailyReports[i].reportNote)) {
            dailyReports[i].reportNote = undefined;
          }

          try {
            await dailyReports[i].save();
          } catch (e: any) {
            logger.error(`Daily Report Save All error: ${e.message}`);
          }
        }
      }

      // Crew
      if (!skip?.includes(SkipSave.Crew)) {
        const crews = await Crew.find();
        logger.info(`Saving ${crews.length} crew documents`);
        for (let i = 0; i < crews.length; i++) {
          try {
            await crews[i].save();
          } catch (e: any) {
            logger.error(`Crew Save All error: ${e.message}`);
          }
        }
      }

      // Material
      if (!skip?.includes(SkipSave.Material)) {
        const materials = await Material.find();
        logger.info(`Saving ${materials.length} material documents`);
        for (let i = 0; i < materials.length; i++) {
          try {
            await materials[i].save();
          } catch (e: any) {
            logger.error(`Material Save All error: ${e.message}`);
          }
        }
      }

      // Company
      if (!skip?.includes(SkipSave.Company)) {
        const companies = await Company.find();
        logger.info(`Saving ${companies.length} company documents`);
        for (let i = 0; i < companies.length; i++) {
          try {
            await companies[i].save();
          } catch (e: any) {
            logger.error(`Company Save All error: ${e.message}`);
          }
        }
      }

      console.log("Finished saving");

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default saveAll;
