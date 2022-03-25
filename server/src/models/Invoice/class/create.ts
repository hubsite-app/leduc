import { InvoiceDocument, InvoiceModel } from "@models";
import { IInvoiceCreate } from "@typescript/invoice";

const document = (Invoice: InvoiceModel, data: IInvoiceCreate) => {
  return new Promise<InvoiceDocument>(async (resolve, reject) => {
    try {
      const invoice = new Invoice();

      await data.jobsite.addInvoice(invoice);

      resolve(invoice);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
