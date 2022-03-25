import { SearchOptions } from "@graphql/types/query";
import { Company, CompanyClass } from "@models";
import { ListOptionData } from "@typescript/graphql";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import mutations, { CompanyCreateData } from "./mutations";

@Resolver(() => CompanyClass)
export default class CompanyResolver {
  /**
   * ----- Queries -----
   */

  @Query(() => CompanyClass)
  async company(@Arg("id") id: string) {
    return Company.getById(id);
  }

  @Query(() => [CompanyClass])
  async companies(
    @Arg("options", () => ListOptionData, { nullable: true })
    options?: ListOptionData
  ) {
    return Company.getList(options);
  }

  @Query(() => [CompanyClass])
  async companySearch(
    @Arg("searchString") searchString: string,
    @Arg("options", () => SearchOptions, { nullable: true })
    options: SearchOptions
  ) {
    return (await Company.search(searchString, options)).map(
      (object) => object.company
    );
  }

  /**
   * ----- Mutations -----
   */

  @Mutation(() => CompanyClass)
  async companyCreate(@Arg("data") data: CompanyCreateData) {
    return mutations.create(data);
  }
}
