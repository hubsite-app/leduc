import { Invoice, InvoiceDocument } from "@models";
import _ids from "@testing/_ids";

export interface SeededInvoices {
  jobsite_3_invoice_1: InvoiceDocument;
  jobsite_2_material_1_invoice_1: InvoiceDocument;
  jobsite_2_material_1_invoice_2: InvoiceDocument;
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

  const jobsite_2_material_1_invoice_1 = new Invoice({
    _id: _ids.invoices.jobsite_2_material_1_invoice_1._id,
    company: _ids.companies.company_1._id,
    invoiceNumber: "83-393",
    cost: 5000,
    internal: false,
    description: "Material Invoice",
    date: new Date("2022-02-26 7:00 am"),
  });

  const jobsite_2_material_1_invoice_2 = new Invoice({
    _id: _ids.invoices.jobsite_2_material_1_invoice_2._id,
    company: _ids.companies.company_1._id,
    invoiceNumber: "83-394",
    cost: 10000,
    internal: false,
    description: "Material Invoice",
    date: new Date("2022-03-05 7:00 am"),
  });

  const invoices = {
    jobsite_3_invoice_1,
    jobsite_2_material_1_invoice_1,
    jobsite_2_material_1_invoice_2,
  };

  for (let i = 0; i < Object.values(invoices).length; i++) {
    await Object.values(invoices)[i].save();
  }

  return invoices;
};

export default createInvoices;
