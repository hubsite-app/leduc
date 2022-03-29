import { CompanyClass, InvoiceClass, InvoiceDocument } from "@models";
import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
} from "type-graphql";
import mutations, { InvoiceData } from "./mutations";

@Resolver(() => InvoiceClass)
export default class InvoiceResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => CompanyClass)
  async company(@Root() invoice: InvoiceDocument) {
    return invoice.getCompany();
  }

  /**
   * ----- Mutations -----
   */

  @Authorized(["ADMIN"])
  @Mutation(() => InvoiceClass)
  async invoiceUpdate(@Arg("id") id: string, @Arg("data") data: InvoiceData) {
    return mutations.update(id, data);
  }
}
