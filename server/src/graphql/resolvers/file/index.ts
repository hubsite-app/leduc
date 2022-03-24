import { File, FileClass, FileDocument } from "@models";

import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";

@Resolver(() => FileClass)
export default class FileResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => String)
  async buffer(@Root() file: FileDocument) {
    return file.getBuffer();
  }

  /**
   * ----- Queries -----
   */

  @Query(() => FileClass)
  async file(@Arg("id") id: string) {
    return File.getById(id);
  }
}
