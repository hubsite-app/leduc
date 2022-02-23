import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";

import { CrewClass, Vehicle, VehicleClass, VehicleDocument } from "@models";

@Resolver(() => VehicleClass)
export default class VehicleResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => [CrewClass])
  async crews(@Root() vehicle: VehicleDocument) {
    return vehicle.getCrews();
  }

  /**
   * ----- Queries -----
   */

  @Query(() => VehicleClass)
  async vehicle(@Arg("id") id: string) {
    return Vehicle.getById(id);
  }
}
