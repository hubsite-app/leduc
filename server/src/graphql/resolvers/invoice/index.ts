import { CompanyClass, InvoiceClass, InvoiceDocument } from "@models";
import { FieldResolver, Resolver, Root } from "type-graphql";

@Resolver(() => InvoiceClass)
export default class InvoiceResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => CompanyClass)
  async company(@Root() invoice: InvoiceDocument) {
    return invoice.getCompany();
  }
}
