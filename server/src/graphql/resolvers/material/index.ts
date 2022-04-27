import { SearchOptions } from "@graphql/types/query";
import { Material, MaterialClass, MaterialDocument } from "@models";
import { ListOptionData } from "@typescript/graphql";
import { Id } from "@typescript/models";
import {
  Arg,
  Authorized,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import mutations, { MaterialCreateData } from "./mutations";

@Resolver(() => MaterialClass)
export default class MaterialResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => Boolean)
  async canRemove(@Root() material: MaterialDocument) {
    return material.canRemove();
  }

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

  @Authorized(["ADMIN"])
  @Mutation(() => Boolean)
  async materialRemove(@Arg("id", () => ID) id: Id) {
    return mutations.remove(id);
  }
}
