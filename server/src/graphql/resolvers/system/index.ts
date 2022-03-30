import { DefaultRateData } from "@graphql/types/mutation";
import { System, SystemClass } from "@models";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import mutations from "./mutations";

@Resolver(() => SystemClass)
export default class SystemResolver {
  /**
   * ----- Queries -----
   */

  @Query(() => SystemClass)
  async system() {
    return System.getSystem();
  }

  /**
   * ----- Mutations -----
   */

  @Mutation(() => SystemClass)
  async systemUpdateUnitDefauls(@Arg("data") data: string[]) {
    return mutations.unitDefaults(data);
  }

  @Mutation(() => SystemClass)
  async systemUpdateCompanyVehicleTypeDefaults(
    @Arg("data") data: DefaultRateData[]
  ) {
    return mutations.companyVehicleTypeDefaults(data);
  }

  @Mutation(() => SystemClass)
  async systemUpdateMaterialShipmentVehicleTypeDefaults(
    @Arg("data") data: DefaultRateData[]
  ) {
    return mutations.materialShipmentVehicleTypeDefaults(data);
  }
}
