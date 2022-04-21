import {
  DailyReportDocument,
  EmployeeDocument,
  EmployeeWorkDocument,
  Jobsite,
  JobsiteDocument,
  MaterialShipmentDocument,
  ProductionDocument,
  ReportNoteDocument,
  VehicleDocument,
  VehicleWorkDocument,
} from "@models";
import { IDailyReportUpdate } from "@typescript/dailyReport";

const document = (
  dailyReport: DailyReportDocument,
  data: IDailyReportUpdate
) => {
  return new Promise<{
    employeeWork: EmployeeWorkDocument[];
    materialShipments: MaterialShipmentDocument[];
  }>(async (resolve, reject) => {
    try {
      const jobsite = await Jobsite.getById(data.jobsiteId);
      if (!jobsite) throw new Error("Could not find this Jobsite");
      await dailyReport.updateJobsite(jobsite);

      const { employeeWork, materialShipments } = await dailyReport.updateDate(
        data.date
      );

      resolve({ employeeWork, materialShipments });
    } catch (e) {
      reject(e);
    }
  });
};

const date = (dailyReport: DailyReportDocument, date: Date) => {
  return new Promise<{
    employeeWork: EmployeeWorkDocument[];
    materialShipments: MaterialShipmentDocument[];
  }>(async (resolve, reject) => {
    try {
      dailyReport.date = date;

      const employeeWork = await dailyReport.getEmployeeWork();
      for (let i = 0; i < employeeWork.length; i++) {
        await employeeWork[i].updateDate(date);
      }

      const materialShipments = await dailyReport.getMaterialShipments();
      for (let i = 0; i < materialShipments.length; i++) {
        await materialShipments[i].updateDate(date);
      }

      resolve({ employeeWork, materialShipments });
    } catch (e) {
      reject(e);
    }
  });
};

const jobsite = (
  dailyReport: DailyReportDocument,
  jobsite: JobsiteDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const materialShipments = await dailyReport.getMaterialShipments();
      for (let i = 0; i < materialShipments.length; i++) {
        if (
          materialShipments[i].noJobsiteMaterial === false ||
          materialShipments[i].jobsiteMaterial
        ) {
          throw new Error("cannot update the jobsite of this report");
        }
      }

      dailyReport.jobsite = jobsite._id;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const jobCodeApproval = (
  dailyReport: DailyReportDocument,
  approved: boolean
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      dailyReport.approved = approved;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const payrollComplete = (
  dailyReport: DailyReportDocument,
  complete: boolean
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      dailyReport.payrollComplete = complete;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
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

const setReportNote = (
  dailyReport: DailyReportDocument,
  reportNote: ReportNoteDocument
) => {
  return new Promise<void>((resolve, reject) => {
    try {
      if (!!dailyReport.reportNote)
        throw new Error(
          "dailyReport.setReportNote: this report already has notes"
        );

      dailyReport.reportNote = reportNote._id;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const addTemporaryEmployee = (
  dailyReport: DailyReportDocument,
  employee: EmployeeDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const crew = await dailyReport.getCrew();
      if (crew.employees.includes(employee._id.toString()))
        throw new Error(
          "dailyReport.addTemporaryEmployee: this employee already belongs to the crew"
        );

      if (!dailyReport.temporaryEmployees.includes(employee._id.toString())) {
        dailyReport.temporaryEmployees.push(employee._id);
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const addTemporaryVehicle = (
  dailyReport: DailyReportDocument,
  vehicle: VehicleDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const crew = await dailyReport.getCrew();
      if (crew.vehicles.includes(vehicle._id.toString()))
        throw new Error(
          "dailyReport.addTemporaryVehicle: this vehicle already belongs to the crew"
        );

      if (!dailyReport.temporaryVehicles.includes(vehicle._id.toString())) {
        dailyReport.temporaryVehicles.push(vehicle._id);
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
  date,
  jobsite,
  jobCodeApproval,
  payrollComplete,
  addEmployeeWork,
  addVehicleWork,
  addProduction,
  addMaterialShipment,
  setReportNote,
  addTemporaryEmployee,
  addTemporaryVehicle,
};
