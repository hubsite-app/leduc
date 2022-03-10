import { SearchClass } from "@graphql/types/search";
import { Arg, Query, Resolver } from "type-graphql";
import queries from "./queries";

@Resolver(() => SearchClass)
export default class SearchResolver {
  /**
   * ----- Queries -----
   */

  @Query(() => [SearchClass])
  async search(@Arg("searchString") searchString: string) {
    return queries.search(searchString);
  }
}
