import {
  Invoice,
  InvoiceClass,
  InvoiceReportClass,
  InvoiceReportDocument,
} from "@models";
import { FieldResolver, Resolver, Root } from "type-graphql";

@Resolver(() => InvoiceReportClass)
export default class InvoiceReportResolver {
  @FieldResolver(() => InvoiceClass)
  async invoice(@Root() invoiceReport: InvoiceReportDocument) {
    return Invoice.getById(invoiceReport.invoice!);
  }
}
