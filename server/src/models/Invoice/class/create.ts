import { InvoiceDocument, InvoiceModel } from "@models";
import { IInvoiceCreate } from "@typescript/invoice";

const document = (Invoice: InvoiceModel, data: IInvoiceCreate) => {
  return new Promise<InvoiceDocument>(async (resolve, reject) => {
    try {
      const invoice = new Invoice({
        company: data.company._id,
        invoiceNumber: data.invoiceNumber,
        cost: data.cost,
        description: data.description,
        internal: data.internal,
      });

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
