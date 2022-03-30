import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import { VehicleDocument, VehicleModel } from "@models";
import { VehicleSchema } from "..";
import { GetByIDOptions, IRatesData, ISearchOptions } from "@typescript/models";
import get from "./get";
import { IVehicleCreate } from "@typescript/vehicle";
import create from "./create";
import update from "./update";

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

  public static async search(
    this: VehicleModel,
    searchString: string,
    options?: ISearchOptions
  ) {
    return get.search(this, searchString, options);
  }

  public static async getByCode(this: VehicleModel, code: string) {
    return get.byCode(this, code);
  }

  public async getCrews(this: VehicleDocument) {
    return get.crews(this);
  }

  /**
   * ----- Create -----
   */

  public static async createDocument(this: VehicleModel, data: IVehicleCreate) {
    return create.document(this, data);
  }

  /**
   * ----- Update -----
   */

  public async updateRates(this: VehicleDocument, data: IRatesData[]) {
    return update.rates(this, data);
  }
}
