import { VehicleWorkDocument } from "@models";
import { ObjectType } from "type-graphql";
import { VehicleWorkSchema } from "..";
import get from "./get";

@ObjectType()
export class VehicleWorkClass extends VehicleWorkSchema {
  /**
   * ----- Get -----
   */

  public async getVehicle(this: VehicleWorkDocument) {
    return get.vehicle(this);
  }
}
