import { CrewDocument } from "@models";
import { Id } from "@typescript/models";

const employee = (crew: CrewDocument, employeeId: Id) => {
  return new Promise<void>((resolve, reject) => {
    try {
      const index = crew.employees.findIndex(
        (id) => employeeId.toString() === id!.toString()
      );

      if (index !== -1) {
        crew.employees.splice(index, 1);
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const vehicle = (crew: CrewDocument, vehicleId: Id) => {
  return new Promise<void>((resolve, reject) => {
    try {
      const index = crew.vehicles.findIndex(
        (id) => vehicleId.toString() === id!.toString()
      );

      if (index !== -1) {
        crew.vehicles.splice(index, 1);
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  employee,
  vehicle,
};
