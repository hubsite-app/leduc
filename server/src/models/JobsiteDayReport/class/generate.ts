import { logger } from "@logger";
import {
  DailyReport,
  DailyReportDocument,
  Employee,
  EmployeeWorkDocument,
  JobsiteDayReportDocument,
  JobsiteMaterial,
  MaterialShipmentDocument,
  Vehicle,
  VehicleWorkDocument,
} from "@models";
import { CrewTypes } from "@typescript/crew";
import { Id } from "@typescript/models";
import getTruckingRateForTime from "@utils/getTruckingRateForTime";
import dayjs from "dayjs";
import {
  EmployeeReportClass,
  MaterialReportClass,
  VehicleReportClass,
  NonCostedMaterialReportClass,
  TruckingReportClass,
  DaySummaryReportClass,
  CrewTypeDaySummaryClass,
} from "../schema/subDocument";

const reports = (jobsiteDayReport: JobsiteDayReportDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const dailyReports = await DailyReport.getByJobsiteDayReport(
        jobsiteDayReport
      );

      jobsiteDayReport.dailyReports = dailyReports.map((report) => report._id);

      /**
       * Generate Employee reports
       */
      await jobsiteDayReport.generateEmployeeReports(dailyReports);

      /**
       * Generate Vehicle reports
       */
      await jobsiteDayReport.generateVehicleReports(dailyReports);

      /**
       * Generate Material reports
       */
      await jobsiteDayReport.generateMaterialReports(dailyReports);

      /**
       * Generate Non-costed Material reports
       */
      await jobsiteDayReport.generateNonCostedMaterialReports(dailyReports);

      /**
       * Generate Trucking reports
       */
      await jobsiteDayReport.generateTruckingReports(dailyReports);

      /**
       * Generate Crew Types
       */

      await jobsiteDayReport.generateCrewTypes();

      /**
       * Generate Summary report
       */
      await jobsiteDayReport.generateSummaryReports();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const employeeReports = (
  jobsiteDayReport: JobsiteDayReportDocument,
  dailyReports?: DailyReportDocument[]
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (!dailyReports || dailyReports.length === 0) {
        dailyReports = await DailyReport.getByJobsiteDayReport(
          jobsiteDayReport
        );
      }

      // Get all employee hours
      interface EmployeeWorkObject {
        work: EmployeeWorkDocument;
        crewType: CrewTypes;
      }
      const employeeWorkObject: EmployeeWorkObject[] = [];
      for (let i = 0; i < dailyReports.length; i++) {
        let crewType = CrewTypes.Other;
        try {
          crewType = (await dailyReports[i].getCrew()).type;
        } catch (e) {
          logger.error("employeeReports: unable to find crew");
        }

        employeeWorkObject.push.apply(
          employeeWorkObject,
          (await dailyReports[i].getEmployeeWork()).map((work) => {
            return {
              work,
              crewType,
            };
          })
        );
      }

      // Catalog all employees and their work
      const employeeObjects: {
        employee: Id;
        employeeWork: EmployeeWorkDocument[];
        crewType: CrewTypes;
      }[] = [];
      for (let i = 0; i < employeeWorkObject.length; i++) {
        let matchedIndex = -1;
        for (let j = 0; j < employeeObjects.length; j++) {
          if (
            employeeObjects[j].employee.toString() ===
              employeeWorkObject[i].work.employee!.toString() &&
            employeeObjects[j].crewType === employeeWorkObject[i].crewType
          )
            matchedIndex = j;
        }

        if (matchedIndex === -1) {
          employeeObjects.push({
            employee: employeeWorkObject[i].work.employee!.toString(),
            employeeWork: [employeeWorkObject[i].work],
            crewType: employeeWorkObject[i].crewType,
          });
        } else {
          employeeObjects[matchedIndex].employeeWork.push(
            employeeWorkObject[i].work
          );
        }
      }

      // Create all EmployeeReports
      const employeeReports: EmployeeReportClass[] = [];
      for (let i = 0; i < employeeObjects.length; i++) {
        const employeeObject = employeeObjects[i];

        let hours = 0;
        for (let j = 0; j < employeeObject.employeeWork.length; j++) {
          const work = employeeObject.employeeWork[j];

          hours += Math.abs(
            dayjs(work.startTime).diff(dayjs(work.endTime), "hours")
          );
        }

        // Create and push report
        try {
          const employee = (await Employee.getById(employeeObject.employee, {
            throwError: true,
          }))!;

          const employeeReport: EmployeeReportClass = {
            employee: employee._id,
            employeeWork: employeeObject.employeeWork.map(
              (object) => object._id
            ),
            crewType: employeeObject.crewType,
            hours,
            rate: await employee.getRateForTime(jobsiteDayReport.date),
          };

          employeeReports.push(employeeReport);
        } catch (error: any) {
          logger.error("Unable to create employee report");
        }
      }

      jobsiteDayReport.employees = employeeReports;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const vehicleReports = (
  jobsiteDayReport: JobsiteDayReportDocument,
  dailyReports?: DailyReportDocument[]
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (!dailyReports || dailyReports.length === 0) {
        dailyReports = await DailyReport.getByJobsiteDayReport(
          jobsiteDayReport
        );
      }

      // Get all vehicle hours
      interface VehicleWorkObject {
        work: VehicleWorkDocument;
        crewType: CrewTypes;
      }
      const vehicleWorkObject: VehicleWorkObject[] = [];
      for (let i = 0; i < dailyReports.length; i++) {
        let crewType = CrewTypes.Other;
        try {
          crewType = (await dailyReports[i].getCrew()).type;
        } catch (e) {
          logger.error("vehicleReports: unable to find crew");
        }

        vehicleWorkObject.push.apply(
          vehicleWorkObject,
          (await dailyReports[i].getVehicleWork()).map((work) => {
            return {
              work,
              crewType,
            };
          })
        );
      }

      // Catalog all vehicles and their work
      const vehicleObjects: {
        vehicle: Id;
        vehicleWork: VehicleWorkDocument[];
        crewType: CrewTypes;
      }[] = [];
      for (let i = 0; i < vehicleWorkObject.length; i++) {
        let matchedIndex = -1;
        for (let j = 0; j < vehicleObjects.length; j++) {
          if (
            vehicleObjects[j].vehicle.toString() ===
              vehicleWorkObject[i].work.vehicle!.toString() &&
            vehicleObjects[j].crewType === vehicleWorkObject[i].crewType
          )
            matchedIndex = j;
        }

        if (matchedIndex === -1) {
          vehicleObjects.push({
            vehicle: vehicleWorkObject[i].work.vehicle!.toString(),
            vehicleWork: [vehicleWorkObject[i].work],
            crewType: vehicleWorkObject[i].crewType,
          });
        } else {
          vehicleObjects[matchedIndex].vehicleWork.push(
            vehicleWorkObject[i].work
          );
        }
      }

      // Create all EmployeeReports
      const vehicleReports: VehicleReportClass[] = [];
      for (let i = 0; i < vehicleObjects.length; i++) {
        const vehicleObject = vehicleObjects[i];

        let hours = 0;
        for (let j = 0; j < vehicleObject.vehicleWork.length; j++) {
          const work = vehicleObject.vehicleWork[j];

          hours += work.hours;
        }

        // Create and push report
        try {
          const vehicle = (await Vehicle.getById(vehicleObject.vehicle, {
            throwError: true,
          }))!;

          const vehicleReport: VehicleReportClass = {
            vehicle: vehicle._id,
            vehicleWork: vehicleObject.vehicleWork.map((object) => object._id),
            crewType: vehicleObject.crewType,
            hours,
            rate: await vehicle.getRateForTime(jobsiteDayReport.date),
          };

          vehicleReports.push(vehicleReport);
        } catch (error: any) {
          logger.error("Unable to create vehicle report");
        }
      }

      jobsiteDayReport.vehicles = vehicleReports;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const materialReports = (
  jobsiteDayReport: JobsiteDayReportDocument,
  dailyReports?: DailyReportDocument[]
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (!dailyReports || dailyReports.length === 0) {
        dailyReports = await DailyReport.getByJobsiteDayReport(
          jobsiteDayReport
        );
      }

      // Get all relevant material shipments
      interface ShipmentObject {
        materialShipment: MaterialShipmentDocument;
        crewType: CrewTypes;
      }
      const materialShipmentObjects: ShipmentObject[] = [];
      for (let i = 0; i < dailyReports.length; i++) {
        let crewType = CrewTypes.Other;
        try {
          crewType = (await dailyReports[i].getCrew()).type;
        } catch (e) {
          logger.error("materialReports: unable to find crew");
        }

        const materialShipments = await dailyReports[i].getMaterialShipments();
        const sortedShipments = materialShipments.filter(
          (shipment) => shipment.noJobsiteMaterial === false
        );

        materialShipmentObjects.push.apply(
          materialShipmentObjects,
          sortedShipments.map((shipment) => {
            return {
              materialShipment: shipment,
              crewType,
            };
          })
        );
      }

      // Catalog all jobsiteMaterials and their shipments
      const jobsiteMaterialObjects: {
        jobsiteMaterial: Id;
        materialShipments: MaterialShipmentDocument[];
        crewType: CrewTypes;
      }[] = [];
      for (let i = 0; i < materialShipmentObjects.length; i++) {
        let matchedIndex = -1;
        for (let j = 0; j < jobsiteMaterialObjects.length; j++) {
          if (
            jobsiteMaterialObjects[j].jobsiteMaterial.toString() ===
              materialShipmentObjects[
                i
              ].materialShipment.jobsiteMaterial!.toString() &&
            jobsiteMaterialObjects[j].crewType ===
              materialShipmentObjects[i].crewType
          )
            matchedIndex = j;
        }

        if (matchedIndex === -1) {
          jobsiteMaterialObjects.push({
            jobsiteMaterial:
              materialShipmentObjects[
                i
              ].materialShipment.jobsiteMaterial!.toString(),
            materialShipments: [materialShipmentObjects[i].materialShipment],
            crewType: materialShipmentObjects[i].crewType,
          });
        } else {
          jobsiteMaterialObjects[matchedIndex].materialShipments.push(
            materialShipmentObjects[i].materialShipment
          );
        }
      }

      // Create all MaterialReports
      const materialReports: MaterialReportClass[] = [];
      for (let i = 0; i < jobsiteMaterialObjects.length; i++) {
        const jobsiteMaterialObject = jobsiteMaterialObjects[i];

        let quantity = 0;
        for (
          let j = 0;
          j < jobsiteMaterialObject.materialShipments.length;
          j++
        ) {
          const shipment = jobsiteMaterialObject.materialShipments[j];

          quantity += shipment.quantity;
        }

        // Create and push report
        try {
          const jobsiteMaterial = (await JobsiteMaterial.getById(
            jobsiteMaterialObject.jobsiteMaterial,
            {
              throwError: true,
            }
          ))!;

          const materialReport: MaterialReportClass = {
            jobsiteMaterial: jobsiteMaterial._id,
            materialShipments: jobsiteMaterialObject.materialShipments.map(
              (object) => object._id
            ),
            crewType: jobsiteMaterialObject.crewType,
            quantity,
            rate: await jobsiteMaterial.getRateForTime(jobsiteDayReport.date),
          };

          materialReports.push(materialReport);
        } catch (error: any) {
          logger.error("Unable to create material report");
        }
      }

      jobsiteDayReport.materials = materialReports;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const nonCostedMaterialReports = (
  jobsiteDayReport: JobsiteDayReportDocument,
  dailyReports?: DailyReportDocument[]
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (!dailyReports || dailyReports.length === 0) {
        dailyReports = await DailyReport.getByJobsiteDayReport(
          jobsiteDayReport
        );
      }

      // Get all relevant material shipments
      interface ShipmentObject {
        materialShipment: MaterialShipmentDocument;
        crewType: CrewTypes;
      }
      const materialShipmentObjects: ShipmentObject[] = [];
      for (let i = 0; i < dailyReports.length; i++) {
        let crewType = CrewTypes.Other;
        try {
          crewType = (await dailyReports[i].getCrew()).type;
        } catch (e) {
          logger.error("nonCostedMaterials: unable to find crew");
        }

        const materialShipments = await dailyReports[i].getMaterialShipments();
        const sortedShipments = materialShipments.filter(
          (shipment) => shipment.noJobsiteMaterial === true
        );

        materialShipmentObjects.push.apply(
          materialShipmentObjects,
          sortedShipments.map((shipment) => {
            return {
              materialShipment: shipment,
              crewType,
            };
          })
        );
      }

      // Catalog all material supplier combinations and their shipments
      const uniqueMaterialObjects: {
        materialName: string;
        supplierName: string;
        materialShipments: MaterialShipmentDocument[];
        crewType: CrewTypes;
      }[] = [];
      for (let i = 0; i < materialShipmentObjects.length; i++) {
        let matchedIndex = -1;
        for (let j = 0; j < uniqueMaterialObjects.length; j++) {
          if (
            uniqueMaterialObjects[j].materialName.toString() ===
              materialShipmentObjects[i].materialShipment.shipmentType! &&
            uniqueMaterialObjects[j].supplierName.toString() ===
              materialShipmentObjects[i].materialShipment.supplier! &&
            uniqueMaterialObjects[j].crewType ===
              materialShipmentObjects[i].crewType
          )
            matchedIndex = j;
        }

        if (matchedIndex === -1) {
          uniqueMaterialObjects.push({
            materialName:
              materialShipmentObjects[i].materialShipment.shipmentType || "",
            supplierName:
              materialShipmentObjects[i].materialShipment.supplier || "",
            materialShipments: [materialShipmentObjects[i].materialShipment],
            crewType: materialShipmentObjects[i].crewType,
          });
        } else {
          uniqueMaterialObjects[matchedIndex].materialShipments.push(
            materialShipmentObjects[i].materialShipment
          );
        }
      }

      // Create all NonCostedMaterialReports
      const nonCostedMaterialReports: NonCostedMaterialReportClass[] = [];
      for (let i = 0; i < uniqueMaterialObjects.length; i++) {
        const uniqueMaterialObject = uniqueMaterialObjects[i];

        let quantity = 0;
        for (
          let j = 0;
          j < uniqueMaterialObject.materialShipments.length;
          j++
        ) {
          const shipment = uniqueMaterialObject.materialShipments[j];

          quantity += shipment.quantity;
        }

        // Create and push report
        try {
          const materialReport: NonCostedMaterialReportClass = {
            materialName: uniqueMaterialObject.materialName || "Not Found",
            supplierName: uniqueMaterialObject.supplierName || "Not Found",
            materialShipments: uniqueMaterialObject.materialShipments.map(
              (object) => object._id
            ),
            crewType: uniqueMaterialObject.crewType,
            quantity,
          };

          nonCostedMaterialReports.push(materialReport);
        } catch (error: any) {
          logger.error("Unable to create material report");
        }
      }

      jobsiteDayReport.nonCostedMaterials = nonCostedMaterialReports;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const truckingReports = (
  jobsiteDayReport: JobsiteDayReportDocument,
  dailyReports?: DailyReportDocument[]
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (!dailyReports || dailyReports.length === 0) {
        dailyReports = await DailyReport.getByJobsiteDayReport(
          jobsiteDayReport
        );
      }

      // Get all relevant material shipments
      interface ShipmentObject {
        materialShipment: MaterialShipmentDocument;
        crewType: CrewTypes;
      }
      const materialShipmentObjects: ShipmentObject[] = [];
      for (let i = 0; i < dailyReports.length; i++) {
        let crewType = CrewTypes.Other;
        try {
          crewType = (await dailyReports[i].getCrew()).type;
        } catch (e) {
          logger.error("truckingReports: unable to find crew");
        }

        const materialShipments = await dailyReports[i].getMaterialShipments();

        // All material shipments w/ costed trucking
        const sortedShipments = materialShipments.filter(
          (shipment) => !!shipment.vehicleObject?.truckingRateId
        );

        materialShipmentObjects.push.apply(
          materialShipmentObjects,
          sortedShipments.map((shipment) => {
            return {
              materialShipment: shipment,
              crewType,
            };
          })
        );
      }

      // Catalog all trucks and their shipments
      const uniqueTruckingObjects: {
        truckingRateId: Id;
        materialShipments: MaterialShipmentDocument[];
        crewType: CrewTypes;
      }[] = [];
      for (let i = 0; i < materialShipmentObjects.length; i++) {
        let matchedIndex = -1;
        for (let j = 0; j < uniqueTruckingObjects.length; j++) {
          if (
            uniqueTruckingObjects[j].truckingRateId.toString() ===
              materialShipmentObjects[i].materialShipment.vehicleObject
                ?.truckingRateId &&
            uniqueTruckingObjects[j].crewType ===
              materialShipmentObjects[i].crewType
          )
            matchedIndex = j;
        }

        if (matchedIndex === -1) {
          uniqueTruckingObjects.push({
            truckingRateId:
              materialShipmentObjects[i].materialShipment.vehicleObject
                ?.truckingRateId!,
            materialShipments: [materialShipmentObjects[i].materialShipment],
            crewType: materialShipmentObjects[i].crewType,
          });
        } else {
          uniqueTruckingObjects[matchedIndex].materialShipments.push(
            materialShipmentObjects[i].materialShipment
          );
        }
      }

      // Create all NonCostedMaterialReports
      const truckingReports: TruckingReportClass[] = [];
      for (let i = 0; i < uniqueTruckingObjects.length; i++) {
        const uniqueTruckingObject = uniqueTruckingObjects[i];

        let quantity = 0,
          hours = 0;
        for (
          let j = 0;
          j < uniqueTruckingObject.materialShipments.length;
          j++
        ) {
          const shipment = uniqueTruckingObject.materialShipments[j];

          quantity += shipment.quantity;

          if (shipment.startTime && shipment.endTime)
            hours += Math.abs(
              dayjs(shipment.startTime).diff(dayjs(shipment.endTime), "hours")
            );
        }

        // Try create and push report
        try {
          const jobsite = await jobsiteDayReport.getJobsite();

          const truckingRate = jobsite.truckingRates.find(
            (rate) =>
              rate._id!.toString() ===
              uniqueTruckingObject.truckingRateId.toString()
          );
          if (!truckingRate)
            throw new Error("unable to find trucking rate in report creation");

          const finalRate = getTruckingRateForTime(
            truckingRate,
            jobsiteDayReport.date
          );
          if (!finalRate) throw new Error("unable to find trucking rate");

          const truckingReport: TruckingReportClass = {
            materialShipments: uniqueTruckingObject.materialShipments.map(
              (object) => object._id
            ),
            crewType: uniqueTruckingObject.crewType,
            quantity,
            hours,
            truckingType: truckingRate.title,
            rate: finalRate.rate,
            type: finalRate.type,
          };

          truckingReports.push(truckingReport);
        } catch (error: any) {
          logger.error("Unable to create material report");
        }
      }

      jobsiteDayReport.trucking = truckingReports;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const crewTypes = (jobsiteDayReport: JobsiteDayReportDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const crewTypes: CrewTypes[] = [];

      // Employee Crew Types
      for (let j = 0; j < jobsiteDayReport.employees.length; j++) {
        if (!crewTypes.includes(jobsiteDayReport.employees[j].crewType))
          crewTypes.push(jobsiteDayReport.employees[j].crewType);
      }

      // Vehicle Crew Types
      for (let j = 0; j < jobsiteDayReport.vehicles.length; j++) {
        if (!crewTypes.includes(jobsiteDayReport.vehicles[j].crewType))
          crewTypes.push(jobsiteDayReport.vehicles[j].crewType);
      }

      // Material Crew Types
      for (let j = 0; j < jobsiteDayReport.materials.length; j++) {
        if (!crewTypes.includes(jobsiteDayReport.materials[j].crewType))
          crewTypes.push(jobsiteDayReport.materials[j].crewType);
      }

      // Non-costed Material Crew Types
      for (let j = 0; j < jobsiteDayReport.nonCostedMaterials.length; j++) {
        if (
          !crewTypes.includes(jobsiteDayReport.nonCostedMaterials[j].crewType)
        )
          crewTypes.push(jobsiteDayReport.nonCostedMaterials[j].crewType);
      }

      // Trucking Crew Types
      for (let j = 0; j < jobsiteDayReport.trucking.length; j++) {
        if (!crewTypes.includes(jobsiteDayReport.trucking[j].crewType))
          crewTypes.push(jobsiteDayReport.trucking[j].crewType);
      }

      jobsiteDayReport.crewTypes = crewTypes;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const summaryReport = (jobsiteDayReport: JobsiteDayReportDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const crewTypeSummaries: CrewTypeDaySummaryClass[] = [];
      const crewTypeIndices: { [crewType in CrewTypes]?: number } = {};
      for (let i = 0; i < jobsiteDayReport.crewTypes.length; i++) {
        const crewType = jobsiteDayReport.crewTypes[i];

        crewTypeSummaries.push({
          crewType,
          employeeCost: 0,
          employeeHours: 0,
          materialCost: 0,
          materialQuantity: 0,
          truckingCost: 0,
          truckingHours: 0,
          truckingQuantity: 0,
          vehicleCost: 0,
          vehicleHours: 0,
          nonCostedMaterialQuantity: 0,
        });

        crewTypeIndices[crewType] = crewTypeSummaries.length - 1;
      }

      /**
       * Employees
       */
      let employeeHours = 0,
        employeeCost = 0;
      for (let i = 0; i < jobsiteDayReport.employees.length; i++) {
        const report = jobsiteDayReport.employees[i];

        const hours = report.hours;
        const cost = report.hours * report.rate;

        employeeHours += jobsiteDayReport.employees[i].hours;
        employeeCost += cost;

        crewTypeSummaries[crewTypeIndices[report.crewType]!].employeeHours +=
          hours;
        crewTypeSummaries[crewTypeIndices[report.crewType]!].employeeCost +=
          cost;
      }

      /**
       * Vehicles
       */
      let vehicleHours = 0,
        vehicleCost = 0;
      for (let i = 0; i < jobsiteDayReport.vehicles.length; i++) {
        const report = jobsiteDayReport.vehicles[i];

        const hours = report.hours;
        const cost = report.hours * report.rate;

        vehicleHours += hours;

        vehicleCost += cost;

        crewTypeSummaries[crewTypeIndices[report.crewType]!].vehicleHours +=
          hours;
        crewTypeSummaries[crewTypeIndices[report.crewType]!].vehicleCost +=
          cost;
      }

      /**
       * Materials
       */
      let materialQuantity = 0,
        materialCost = 0;
      for (let i = 0; i < jobsiteDayReport.materials.length; i++) {
        const report = jobsiteDayReport.materials[i];

        const quantity = report.quantity;
        const cost = report.quantity * report.rate;

        materialQuantity += jobsiteDayReport.materials[i].quantity;
        materialCost += cost;

        crewTypeSummaries[crewTypeIndices[report.crewType]!].materialQuantity +=
          quantity;
        crewTypeSummaries[crewTypeIndices[report.crewType]!].materialCost +=
          cost;
      }

      /**
       * Non Costed Materials
       */
      let nonCostedMaterialQuantity = 0;
      for (let i = 0; i < jobsiteDayReport.nonCostedMaterials.length; i++) {
        const report = jobsiteDayReport.nonCostedMaterials[i];

        const quantity = report.quantity;

        materialQuantity += quantity;

        crewTypeSummaries[
          crewTypeIndices[report.crewType]!
        ].nonCostedMaterialQuantity += quantity;
      }

      /**
       * Trucking
       */
      let truckingQuantity = 0,
        truckingHours = 0,
        truckingCost = 0;
      for (let i = 0; i < jobsiteDayReport.trucking.length; i++) {
        const report = jobsiteDayReport.trucking[i];

        const quantity = report.quantity;
        const hours = report.hours || 0;
        let cost = 0;
        if (report.type === "Hour") {
          cost = report.rate * (report.hours || 0);
        } else if (report.type === "Quantity") {
          cost = report.rate & report.quantity;
        }

        truckingQuantity += quantity;
        crewTypeSummaries[crewTypeIndices[report.crewType]!].truckingQuantity +=
          quantity;

        truckingHours += hours;
        crewTypeSummaries[crewTypeIndices[report.crewType]!].truckingHours +=
          hours;

        truckingCost += cost;
        crewTypeSummaries[crewTypeIndices[report.crewType]!].truckingCost +=
          cost;
      }

      const summary: DaySummaryReportClass = {
        crewTypeSummaries,
        employeeHours,
        employeeCost,
        vehicleHours,
        vehicleCost,
        materialQuantity,
        materialCost,
        nonCostedMaterialQuantity,
        truckingQuantity,
        truckingHours,
        truckingCost,
      };

      jobsiteDayReport.summary = summary;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  reports,
  employeeReports,
  vehicleReports,
  materialReports,
  nonCostedMaterialReports,
  truckingReports,
  crewTypes,
  summaryReport,
};
