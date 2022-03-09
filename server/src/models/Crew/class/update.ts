import { CrewDocument } from "@models";
import { Id } from "@typescript/models";

const addEmployee = (crew: CrewDocument, employeeId: Id) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const existingIndex = crew.employees.findIndex(
        (id) => id!.toString() === employeeId.toString()
      );

      if (existingIndex === -1) {
        crew.employees.push(employeeId);
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const addVehicle = (crew: CrewDocument, vehicleId: Id) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const existingIndex = crew.vehicles.findIndex(
        (id) => id!.toString() === vehicleId.toString()
      );

      if (existingIndex === -1) {
        crew.vehicles.push(vehicleId);
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  addEmployee,
  addVehicle,
};
