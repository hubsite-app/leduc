import {
  CompanyClass,
  JobsiteMaterialClass,
  JobsiteMaterialDocument,
  MaterialClass,
} from "@models";
import { Arg, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
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
