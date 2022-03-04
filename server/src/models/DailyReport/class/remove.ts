import {
  DailyReportDocument,
  EmployeeWorkDocument,
  MaterialShipmentDocument,
  ProductionDocument,
  VehicleWorkDocument,
} from "@models";

const employeeWork = (
  dailyReport: DailyReportDocument,
  employeeWork: EmployeeWorkDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const workIndex = dailyReport.employeeWork.findIndex(
        (id) => id === employeeWork._id
      );

      if (workIndex !== -1) {
        dailyReport.employeeWork.splice(workIndex, 1);
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const vehicleWork = (
  dailyReport: DailyReportDocument,
  vehicleWork: VehicleWorkDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const workIndex = dailyReport.vehicleWork.findIndex(
        (id) => id === vehicleWork._id
      );

      if (workIndex !== -1) {
        dailyReport.vehicleWork.splice(workIndex, 1);
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const production = (
  dailyReport: DailyReportDocument,
  production: ProductionDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const productionIndex = dailyReport.production.findIndex(
        (id) => id === production._id
      );

      if (productionIndex !== -1) {
        dailyReport.production.splice(productionIndex, 1);
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const materialShipment = (
  dailyReport: DailyReportDocument,
  materialShipment: MaterialShipmentDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const materialShipmentIndex = dailyReport.materialShipment.findIndex(
        (id) => id === materialShipment._id
      );

      if (materialShipmentIndex !== -1) {
        dailyReport.materialShipment.splice(materialShipmentIndex, 1);
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  employeeWork,
  vehicleWork,
  production,
  materialShipment,
};
