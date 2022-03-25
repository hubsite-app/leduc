import { Types } from "mongoose";
import {
  Company,
  CompanyDocument,
  InvoiceDocument,
  InvoiceModel,
} from "@models";
import { GetByIDOptions } from "@typescript/models";
import populateOptions from "@utils/populateOptions";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  Invoice: InvoiceModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<InvoiceDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const invoice = await Invoice.findById(id);

      if (!invoice && options.throwError) {
        throw new Error("Invoice.getById: unable to find invoice");
      }

      resolve(invoice);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * ----- Methods -----
 */

const company = (invoice: InvoiceDocument) => {
  return new Promise<CompanyDocument>(async (resolve, reject) => {
    try {
      const company = (await Company.getById(invoice.company!.toString(), {
        throwError: true,
      }))!;

      resolve(company);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  company,
};
