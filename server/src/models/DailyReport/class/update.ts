import {
  DailyReportDocument,
  EmployeeWorkDocument,
  MaterialShipmentDocument,
  ProductionDocument,
  VehicleWorkDocument,
} from "@models";
import { IDailyReportUpdate } from "@typescript/dailyReport";

const document = (
  dailyReport: DailyReportDocument,
  data: IDailyReportUpdate
) => {
  return new Promise<{ employeeWork: EmployeeWorkDocument[] }>(
    async (resolve, reject) => {
      try {
        const { employeeWork } = await dailyReport.updateDate(data.date);

        resolve({ employeeWork });
      } catch (e) {
        reject(e);
      }
    }
  );
};

const date = (dailyReport: DailyReportDocument, date: Date) => {
  return new Promise<{ employeeWork: EmployeeWorkDocument[] }>(
    async (resolve, reject) => {
      try {
        dailyReport.date = date;

        const employeeWork = await dailyReport.getEmployeeWork();
        for (let i = 0; i < employeeWork.length; i++) {
          await employeeWork[i].updateDate(date);
        }

        resolve({ employeeWork });
      } catch (e) {
        reject(e);
      }
    }
  );
};

const addEmployeeWork = (
  dailyReport: DailyReportDocument,
  employeeWork: EmployeeWorkDocument
) => {
  return new Promise<void>((resolve, reject) => {
    try {
      dailyReport.employeeWork.push(employeeWork._id);

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const addVehicleWork = (
  dailyReport: DailyReportDocument,
  vehicleWork: VehicleWorkDocument
) => {
  return new Promise<void>((resolve, reject) => {
    try {
      dailyReport.vehicleWork.push(vehicleWork._id);

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const addProduction = (
  dailyReport: DailyReportDocument,
  production: ProductionDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      dailyReport.production.push(production._id);

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const addMaterialShipment = (
  dailyReport: DailyReportDocument,
  materialShipment: MaterialShipmentDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      dailyReport.materialShipment.push(materialShipment._id);

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
  date,
  addEmployeeWork,
  addVehicleWork,
  addProduction,
  addMaterialShipment,
};
