import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import { VehicleDocument, VehicleModel } from "@models";
import { VehicleSchema } from "..";
import { GetByIDOptions } from "@typescript/models";
import get from "./get";

@ObjectType()
export class VehicleClass extends VehicleSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: VehicleModel,
    id: Types.ObjectId | string,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public async getCrews(this: VehicleDocument) {
    return get.crews(this);
  }
}
