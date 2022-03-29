import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
} from "type-graphql";

import {
  JobsiteMaterialClass,
  MaterialShipmentClass,
  MaterialShipmentDocument,
  VehicleClass,
} from "@models";
import mutations, {
  MaterialShipmentCreateData,
  MaterialShipmentShipmentData,
  MaterialShipmentShipmentDataV1,
} from "./mutations";

@Resolver(() => MaterialShipmentClass)
export default class MaterialShipmentResolver {
  /**
   * ----- Field Resolver -----
   */

  @FieldResolver(() => VehicleClass, { nullable: true })
  async vehicle(@Root() materialShipment: MaterialShipmentDocument) {
    return materialShipment.getVehicle();
  }

  @FieldResolver(() => JobsiteMaterialClass, { nullable: true })
  async jobsiteMaterial(@Root() materialShipment: MaterialShipmentDocument) {
    return materialShipment.getJobsiteMaterial();
  }

  /**
   * ----- Mutations -----
   */

  @Authorized()
  @Mutation(() => [MaterialShipmentClass])
  async materialShipmentCreate(
    @Arg("dailyReportId") dailyReportId: string,
    @Arg("data", () => [MaterialShipmentCreateData])
    data: MaterialShipmentCreateData[]
  ) {
    return mutations.create(dailyReportId, data);
  }

  @Authorized()
  @Mutation(() => MaterialShipmentClass)
  async materialShipmentUpdate(
    @Arg("id") id: string,
    @Arg("data") data: MaterialShipmentShipmentData
  ) {
    return mutations.update(id, data);
  }

  @Authorized()
  @Mutation(() => MaterialShipmentClass)
  async materialShipmentUpdateV1(
    @Arg("id") id: string,
    @Arg("data") data: MaterialShipmentShipmentDataV1
  ) {
    return mutations.updateV1(id, data);
  }

  @Authorized()
  @Mutation(() => String)
  async materialShipmentDelete(@Arg("id") id: string) {
    return mutations.remove(id);
  }
}
