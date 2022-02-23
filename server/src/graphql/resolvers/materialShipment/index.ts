import { FieldResolver, Resolver, Root } from "type-graphql";

import {
  MaterialShipmentClass,
  MaterialShipmentDocument,
  VehicleClass,
} from "@models";

@Resolver(() => MaterialShipmentClass)
export default class MaterialShipmentResolver {
  /**
   * ----- Field Resolver -----
   */

  @FieldResolver(() => VehicleClass, { nullable: true })
  async vehicle(@Root() materialShipment: MaterialShipmentDocument) {
    return materialShipment.getVehicle();
  }
}
