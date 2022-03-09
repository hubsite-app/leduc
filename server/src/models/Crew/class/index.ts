import { Types } from "mongoose";

import { CrewDocument, CrewModel, VehicleDocument } from "@models";
import { ObjectType } from "type-graphql";
import { CrewSchema } from "../schema";
import get from "./get";
import { GetByIDOptions, Id } from "@typescript/models";
import remove from "./remove";
import update from "./update";

@ObjectType()
export class CrewClass extends CrewSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: CrewModel,
    id: Types.ObjectId | string,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public static async getList(this: CrewModel) {
    return get.list(this);
  }

  public static async getByVehicle(this: CrewModel, vehicle: VehicleDocument) {
    return get.byVehicle(this, vehicle);
  }

  public async getEmployees(this: CrewDocument) {
    return get.employees(this);
  }

  public async getVehicles(this: CrewDocument) {
    return get.vehicles(this);
  }

  public async getJobsites(this: CrewDocument) {
    return get.jobsites(this);
  }

  /**
   * ----- Update -----
   */

  public async addEmployee(this: CrewDocument, employeeId: Id) {
    return update.addEmployee(this, employeeId);
  }

  public async addVehicle(this: CrewDocument, vehicleId: Id) {
    return update.addVehicle(this, vehicleId);
  }

  /**
   * ----- Remove -----
   */

  public async removeEmployee(this: CrewDocument, employeeId: Id) {
    return remove.employee(this, employeeId);
  }

  public async removeVehicle(this: CrewDocument, vehicleId: Id) {
    return remove.vehicle(this, vehicleId);
  }
}
