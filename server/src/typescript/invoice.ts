import { CompanyDocument, JobsiteDocument } from "@models";

export interface IInvoiceCreate {
  company: CompanyDocument;
  invoiceNumber: string;
  cost: number;
  date: Date;
  description?: string;
  internal: boolean;
}

export interface IInvoiceUpdate {
  company: CompanyDocument;
  invoiceNumber: string;
  cost: number;
  date: Date;
  description?: string;
  internal: boolean;
}
