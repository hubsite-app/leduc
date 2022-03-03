import { VehicleClass, VehicleWorkClass, VehicleWorkDocument } from "@models";
import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
} from "type-graphql";
import mutations, { VehicleWorkUpdateData } from "./mutations";

@Resolver(() => VehicleWorkClass)
export default class VehicleWorkResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => VehicleClass)
  async vehicle(@Root() vehicleWork: VehicleWorkDocument) {
    return vehicleWork.getVehicle();
  }

  /**
   * ----- Mutations -----
   */

  @Authorized()
  @Mutation(() => VehicleWorkClass)
  async vehicleWorkUpdate(
    @Arg("id") id: string,
    @Arg("data") data: VehicleWorkUpdateData
  ) {
    return mutations.update(id, data);
  }
}
