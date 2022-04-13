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
  InvoiceReportClass,
  SummaryReportClass,
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
       * Generate Expense Invoice reports
       */
      await jobsiteDayReport.generateExpenseInvoiceReports();

      /**
       * Generate Revenue Invoice reports
       */
      await jobsiteDayReport.generateRevenueInvoiceReports();

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
        const crew = await dailyReports[i].getCrew();

        employeeWorkObject.push.apply(
          employeeWorkObject,
          (await dailyReports[i].getEmployeeWork()).map((work) => {
            return {
              work,
              crewType: crew.type,
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
        const crew = await dailyReports[i].getCrew();

        vehicleWorkObject.push.apply(
          vehicleWorkObject,
          (await dailyReports[i].getVehicleWork()).map((work) => {
            return {
              work,
              crewType: crew.type,
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
        const crew = await dailyReports[i].getCrew();

        const materialShipments = await dailyReports[i].getMaterialShipments();
        const sortedShipments = materialShipments.filter(
          (shipment) => shipment.noJobsiteMaterial === false
        );

        materialShipmentObjects.push.apply(
          materialShipmentObjects,
          sortedShipments.map((shipment) => {
            return {
              materialShipment: shipment,
              crewType: crew.type,
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
        const crew = await dailyReports[i].getCrew();

        const materialShipments = await dailyReports[i].getMaterialShipments();
        const sortedShipments = materialShipments.filter(
          (shipment) => shipment.noJobsiteMaterial === true
        );

        materialShipmentObjects.push.apply(
          materialShipmentObjects,
          sortedShipments.map((shipment) => {
            return {
              materialShipment: shipment,
              crewType: crew.type,
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
            materialName: uniqueMaterialObject.materialName,
            supplierName: uniqueMaterialObject.supplierName,
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
        const crew = await dailyReports[i].getCrew();

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
              crewType: crew.type,
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

const expenseInvoiceReports = (jobsiteDayReport: JobsiteDayReportDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Get all expense invoices
      const jobsite = await jobsiteDayReport.getJobsite();
      const expenseInvoices = await jobsite.getExpenseInvoices();

      const invoices: InvoiceReportClass[] = [];
      for (let i = 0; i < expenseInvoices.length; i++) {
        const invoice: InvoiceReportClass = {
          invoice: expenseInvoices[i]._id,
          value: expenseInvoices[i].cost,
          internal: expenseInvoices[i].internal,
        };

        invoices.push(invoice);
      }

      jobsiteDayReport.expenseInvoices = invoices;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const revenueInvoiceReports = (jobsiteDayReport: JobsiteDayReportDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Get all revenue invoices
      const jobsite = await jobsiteDayReport.getJobsite();
      const revenueInvoices = await jobsite.getExpenseInvoices();

      const invoices: InvoiceReportClass[] = [];
      for (let i = 0; i < revenueInvoices.length; i++) {
        const invoice: InvoiceReportClass = {
          invoice: revenueInvoices[i]._id,
          value: revenueInvoices[i].cost,
          internal: revenueInvoices[i].internal,
        };

        invoices.push(invoice);
      }

      jobsiteDayReport.revenueInvoices = invoices;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const summaryReport = (jobsiteDayReport: JobsiteDayReportDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      let employeeHours = 0,
        employeeCost = 0;
      for (let i = 0; i < jobsiteDayReport.employees.length; i++) {
        employeeHours += jobsiteDayReport.employees[i].hours;

        employeeCost +=
          jobsiteDayReport.employees[i].hours *
          jobsiteDayReport.employees[i].rate;
      }

      let vehicleHours = 0,
        vehicleCost = 0;
      for (let i = 0; i < jobsiteDayReport.vehicles.length; i++) {
        vehicleHours += jobsiteDayReport.vehicles[i].hours;

        vehicleCost +=
          jobsiteDayReport.vehicles[i].hours *
          jobsiteDayReport.vehicles[i].rate;
      }

      let materialQuantity = 0,
        materialCost = 0;
      for (let i = 0; i < jobsiteDayReport.materials.length; i++) {
        materialQuantity += jobsiteDayReport.materials[i].quantity;

        materialCost +=
          jobsiteDayReport.materials[i].quantity *
          jobsiteDayReport.materials[i].rate;
      }

      let truckingQuantity = 0,
        truckingHours = 0,
        truckingCost = 0;
      for (let i = 0; i < jobsiteDayReport.trucking.length; i++) {
        truckingQuantity += jobsiteDayReport.trucking[i].quantity;

        truckingHours += jobsiteDayReport.trucking[i].hours || 0;

        if (jobsiteDayReport.trucking[i].type === "Hour") {
          truckingCost +=
            jobsiteDayReport.trucking[i].rate *
            (jobsiteDayReport.trucking[i].hours || 0);
        } else if (jobsiteDayReport.trucking[i].type === "Quantity") {
          truckingCost +=
            jobsiteDayReport.trucking[i].rate &
            jobsiteDayReport.trucking[i].quantity;
        }
      }

      let externalExpenseInvoiceValue = 0,
        internalExpenseInvoiceValue = 0;
      for (let i = 0; i < jobsiteDayReport.expenseInvoices.length; i++) {
        if (jobsiteDayReport.expenseInvoices[i].internal) {
          internalExpenseInvoiceValue +=
            jobsiteDayReport.expenseInvoices[i].value;
        } else {
          externalExpenseInvoiceValue +=
            jobsiteDayReport.expenseInvoices[i].value;
        }
      }

      let externalRevenueInvoiceValue = 0,
        internalRevenueInvoiceValue = 0;
      for (let i = 0; i < jobsiteDayReport.revenueInvoices.length; i++) {
        if (jobsiteDayReport.revenueInvoices[i].internal) {
          internalRevenueInvoiceValue +=
            jobsiteDayReport.revenueInvoices[i].value;
        } else {
          externalRevenueInvoiceValue +=
            jobsiteDayReport.revenueInvoices[i].value;
        }
      }

      const summary: SummaryReportClass = {
        employeeHours,
        employeeCost,
        vehicleHours,
        vehicleCost,
        materialQuantity,
        materialCost,
        truckingQuantity,
        truckingHours,
        truckingCost,
        internalExpenseInvoiceValue,
        externalExpenseInvoiceValue,
        internalRevenueInvoiceValue,
        externalRevenueInvoiceValue,
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
  expenseInvoiceReports,
  revenueInvoiceReports,
  summaryReport,
};
