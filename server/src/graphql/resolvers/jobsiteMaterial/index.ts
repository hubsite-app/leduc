import {
  CompanyClass,
  JobsiteClass,
  JobsiteMaterialClass,
  JobsiteMaterialDocument,
  MaterialClass,
} from "@models";
import {
  Arg,
  FieldResolver,
  Float,
  Mutation,
  Resolver,
  Root,
} from "type-graphql";
import mutations, { JobsiteMaterialUpdateData } from "./mutations";

@Resolver(() => JobsiteMaterialClass)
export default class JobsiteMaterialResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => MaterialClass)
  async material(@Root() jobsiteMaterial: JobsiteMaterialDocument) {
    return jobsiteMaterial.getMaterial();
  }

  @FieldResolver(() => CompanyClass)
  async supplier(@Root() jobsiteMaterial: JobsiteMaterialDocument) {
    return jobsiteMaterial.getSupplier();
  }

  @FieldResolver(() => Float, { nullable: false })
  async completedQuantity(@Root() jobsiteMaterial: JobsiteMaterialDocument) {
    return jobsiteMaterial.getCompletedQuantity();
  }

  @FieldResolver(() => JobsiteClass, { nullable: false })
  async jobsite(@Root() jobsiteMaterial: JobsiteMaterialDocument) {
    return jobsiteMaterial.getJobsite();
  }

  /**
   * ----- Mutations -----
   */

  @Mutation(() => JobsiteMaterialClass)
  async jobsiteMaterialUpdate(
    @Arg("id") id: string,
    @Arg("data") data: JobsiteMaterialUpdateData
  ) {
    return mutations.update(id, data);
  }
}
