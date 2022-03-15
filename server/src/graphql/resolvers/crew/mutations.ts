import { Crew, CrewDocument } from "@models";
import { CrewTypes } from "@typescript/crew";
import { Id } from "@typescript/models";
import { Field, InputType } from "type-graphql";

@InputType()
export class CrewCreateData {
  @Field({ nullable: false })
  public name!: string;

  @Field({ nullable: false })
  public type!: CrewTypes;
}

const create = (data: CrewCreateData) => {
  return new Promise<CrewDocument>(async (resolve, reject) => {
    try {
      const crew = await Crew.createDocument(data);

      await crew.save();

      resolve(crew);
    } catch (e) {
      reject(e);
    }
  });
};

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
  create,
  addEmployee,
  addVehicle,
  removeEmployee,
  removeVehicle,
};
