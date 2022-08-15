import {
  Company,
  CompanyDocument,
  InvoiceDocument,
  InvoiceModel,
} from "@models";
import { GetByIDOptions, Id } from "@typescript/models";
import populateOptions from "@utils/populateOptions";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = async (
  Invoice: InvoiceModel,
  id: Id,
  options: GetByIDOptions = byIdDefaultOptions
): Promise<InvoiceDocument | null> => {
  options = populateOptions(options, byIdDefaultOptions);

  const invoice = await Invoice.findById(id);

  if (!invoice && options.throwError) {
    throw new Error("Invoice.getById: unable to find invoice");
  }

  return invoice;
};

/**
 * ----- Methods -----
 */

const company = async (invoice: InvoiceDocument): Promise<CompanyDocument> => {
  if (!invoice.company) throw new Error("Invoice does not have a company");

  const company = await Company.getById(invoice.company.toString(), {
    throwError: true,
  });

  if (!company) throw new Error("Could not find invoice company");

  return company;
};

export default {
  byId,
  company,
};
