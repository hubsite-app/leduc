import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";

import { CrewClass, Vehicle, VehicleClass, VehicleDocument } from "@models";
import mutations, { VehicleCreateData } from "./mutations";
import { SearchOptions } from "@graphql/types/query";

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

  @Query(() => [VehicleClass])
  async vehicleSearch(
    @Arg("searchString") searchString: string,
    @Arg("options", () => SearchOptions, { nullable: true })
    options?: SearchOptions
  ) {
    return (await Vehicle.search(searchString, options)).map(
      (object) => object.vehicle
    );
  }

  /**
   * ----- Mutations -----
   */

  @Mutation(() => VehicleClass)
  async vehicleCreate(
    @Arg("data") data: VehicleCreateData,
    @Arg("crewId", { nullable: true }) crewId?: string
  ) {
    return mutations.create(data, crewId);
  }
}
