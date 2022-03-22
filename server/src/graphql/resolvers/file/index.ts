import { FileClass, FileDocument } from "@models";

import { FieldResolver, Resolver, Root } from "type-graphql";

@Resolver(() => FileClass)
export default class FileResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => String)
  async buffer(@Root() file: FileDocument) {
    return file.getBuffer();
  }
}
