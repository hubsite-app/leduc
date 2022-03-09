import { Crew, CrewDocument } from "@models";
import { Id } from "@typescript/models";

const addEmployee = (crewId: Id, employeeId: Id) => {
  return new Promise<CrewDocument>(async (resolve, reject) => {
    try {
      const crew = (await Crew.getById(crewId, { throwError: true }))!;

      await crew.addEmployee(employeeId);

      await crew.save();

      resolve(crew);
    } catch (e) {
      reject(e);
    }
  });
};

const addVehicle = (crewId: Id, vehicleId: Id) => {
  return new Promise<CrewDocument>(async (resolve, reject) => {
    try {
      const crew = (await Crew.getById(crewId, { throwError: true }))!;

      await crew.addVehicle(vehicleId);

      await crew.save();

      resolve(crew);
    } catch (e) {
      reject(e);
    }
  });
};

const removeEmployee = (crewId: Id, employeeId: Id) => {
  return new Promise<CrewDocument>(async (resolve, reject) => {
    try {
      const crew = (await Crew.getById(crewId, { throwError: true }))!;

      await crew.removeEmployee(employeeId);

      await crew.save();

      resolve(crew);
    } catch (e) {
      reject(e);
    }
  });
};

const removeVehicle = (crewId: Id, vehicleId: Id) => {
  return new Promise<CrewDocument>(async (resolve, reject) => {
    try {
      const crew = (await Crew.getById(crewId, { throwError: true }))!;

      await crew.removeVehicle(vehicleId);

      await crew.save();

      resolve(crew);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  addEmployee,
  addVehicle,
  removeEmployee,
  removeVehicle,
};
