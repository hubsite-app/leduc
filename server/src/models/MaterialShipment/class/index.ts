import { MaterialShipmentDocument, MaterialShipmentModel } from "@models";
import {
  IMaterialShipmentCreate,
  IMaterialShipmentUpdate,
} from "@typescript/materialShipment";
import { GetByIDOptions, Id } from "@typescript/models";
import { ObjectType } from "type-graphql";
import { MaterialShipmentSchema } from "..";
import create from "./create";
import get from "./get";
import remove from "./remove";
import update from "./update";

@ObjectType()
export class MaterialShipmentClass extends MaterialShipmentSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: MaterialShipmentModel,
    id: Id,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public async getVehicle(this: MaterialShipmentDocument) {
    return get.vehicle(this);
  }

  public async getDailyReport(this: MaterialShipmentDocument) {
    return get.dailyReport(this);
  }

  /**
   * ----- Create -----
   */

  public static async createDocument(
    this: MaterialShipmentModel,
    data: IMaterialShipmentCreate
  ) {
    return create.document(this, data);
  }

  /**
   * ----- Update -----
   */

  public async updateDocument(
    this: MaterialShipmentDocument,
    data: IMaterialShipmentUpdate
  ) {
    return update.document(this, data);
  }

  public async updateDate(this: MaterialShipmentDocument, date: Date) {
    return update.date(this, date);
  }

  /**
   * ----- Remove -----
   */

  public async fullDelete(this: MaterialShipmentDocument) {
    return remove.fullDelete(this);
  }
}
