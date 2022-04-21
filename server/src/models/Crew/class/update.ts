import { CrewDocument } from "@models";
import { ICrewUpdate } from "@typescript/crew";
import { Id } from "@typescript/models";
import isEmpty from "@utils/isEmpty";

const document = (crew: CrewDocument, data: ICrewUpdate) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (!isEmpty(data.name)) crew.name = data.name;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

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
  document,
  addEmployee,
  addVehicle,
};
