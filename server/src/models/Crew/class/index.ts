import { Types } from "mongoose";

import { CrewDocument, CrewModel, VehicleDocument } from "@models";
import { ObjectType } from "type-graphql";
import { CrewSchema } from "../schema";
import get from "./get";
import { GetByIDOptions } from "@typescript/models";

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
}
