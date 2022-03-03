import { VehicleWorkDocument, VehicleWorkModel } from "@models";
import { GetByIDOptions, Id } from "@typescript/models";
import { IVehicleWorkUpdate } from "@typescript/vehicleWork";
import { ObjectType } from "type-graphql";
import { VehicleWorkSchema } from "..";
import get from "./get";
import update from "./update";

@ObjectType()
export class VehicleWorkClass extends VehicleWorkSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: VehicleWorkModel,
    id: Id,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public async getVehicle(this: VehicleWorkDocument) {
    return get.vehicle(this);
  }

  /**
   * ----- Update -----
   */

  public async updateDocument(
    this: VehicleWorkDocument,
    data: IVehicleWorkUpdate
  ) {
    return update.document(this, data);
  }
}
