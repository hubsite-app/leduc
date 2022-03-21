import { SearchOptions } from "@graphql/types/query";
import { Material, MaterialClass } from "@models";
import { ListOptionData } from "@typescript/graphql";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import mutations, { MaterialCreateData } from "./mutations";

@Resolver(() => MaterialClass)
export default class MaterialResolver {
  /**
   * ----- Queries -----
   */

  @Query(() => MaterialClass)
  async material(@Arg("id") id: string) {
    return Material.getById(id);
  }

  @Query(() => [MaterialClass])
  async materials(
    @Arg("options", () => ListOptionData, { nullable: true })
    options?: ListOptionData
  ) {
    return Material.getList(options);
  }

  @Query(() => [MaterialClass])
  async materialSearch(
    @Arg("searchString") searchString: string,
    @Arg("options", () => SearchOptions, { nullable: true })
    options: SearchOptions
  ) {
    return (await Material.search(searchString, options)).map(
      (object) => object.material
    );
  }

  /**
   * ----- Mutations -----
   */

  @Mutation(() => MaterialClass)
  async materialCreate(@Arg("data") data: MaterialCreateData) {
    return mutations.create(data);
  }
}
