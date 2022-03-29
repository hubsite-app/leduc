import { CompanyDocument, JobsiteDocument } from "@models";

export interface IInvoiceCreate {
  jobsite: JobsiteDocument;
  company: CompanyDocument;
  invoiceNumber: string;
  cost: number;
  description?: string;
  internal: boolean;
}

export interface IInvoiceUpdate {
  company: CompanyDocument;
  invoiceNumber: string;
  cost: number;
  description?: string;
  internal: boolean;
}
