import { Invoice, InvoiceDocument } from "@models";
import _ids from "@testing/_ids";

export interface SeededInvoices {
  jobsite_3_invoice_1: InvoiceDocument;
}

const createInvoices = async (): Promise<SeededInvoices> => {
  const jobsite_3_invoice_1 = new Invoice({
    _id: _ids.invoices.jobsite_3_invoice_1._id,
    company: _ids.companies.company_1._id,
    invoiceNumber: "123",
    cost: 25,
    internal: false,
    description: "The description",
  });

  const invoices = {
    jobsite_3_invoice_1,
  };

  for (let i = 0; i < Object.values(invoices).length; i++) {
    await Object.values(invoices)[i].save();
  }

  return invoices;
};

export default createInvoices;
