import { InvoiceDocument } from "@models";
import { IInvoiceUpdate } from "@typescript/invoice";

const document = (invoice: InvoiceDocument, data: IInvoiceUpdate) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      invoice.company = data.company._id;

      invoice.invoiceNumber = data.invoiceNumber;

      invoice.cost = data.cost;

      invoice.date = data.date;

      invoice.description = data.description;

      invoice.internal = data.internal;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
