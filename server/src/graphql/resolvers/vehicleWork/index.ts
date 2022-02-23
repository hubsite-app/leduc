import { VehicleClass, VehicleWorkClass, VehicleWorkDocument } from "@models";
import { FieldResolver, Resolver, Root } from "type-graphql";

@Resolver(() => VehicleWorkClass)
export default class VehicleWorkResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => VehicleClass)
  async vehicle(@Root() vehicleWork: VehicleWorkDocument) {
    return vehicleWork.getVehicle();
  }
}
