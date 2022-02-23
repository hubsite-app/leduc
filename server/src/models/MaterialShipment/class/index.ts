import { MaterialShipmentDocument } from "@models";
import { ObjectType } from "type-graphql";
import { MaterialShipmentSchema } from "..";
import get from "./get";

@ObjectType()
export class MaterialShipmentClass extends MaterialShipmentSchema {
  /**
   * ----- Get -----
   */

  public async getVehicle(this: MaterialShipmentDocument) {
    return get.vehicle(this);
  }
}
