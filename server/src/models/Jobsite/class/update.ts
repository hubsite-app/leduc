import {
  InvoiceDocument,
  JobsiteDocument,
  JobsiteMaterialDocument,
} from "@models";
import { IDefaultRateData } from "@typescript/models";

const addMaterial = (
  jobsite: JobsiteDocument,
  jobsiteMaterial: JobsiteMaterialDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const existingIndex = jobsite.materials.findIndex(
        (material) => material?.toString() === jobsiteMaterial._id.toString()
      );

      if (existingIndex === -1) {
        jobsite.materials.push(jobsiteMaterial._id);
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const addInvoice = (jobsite: JobsiteDocument, invoice: InvoiceDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const existingIndex = jobsite.invoices.findIndex(
        (inv) => inv?.toString() === invoice._id.toString()
      );

      if (existingIndex === -1) {
        jobsite.invoices.push(invoice._id);
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const truckingRates = (
  jobsite: JobsiteDocument,
  truckingRates: IDefaultRateData[]
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      jobsite.truckingRates = truckingRates;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  addMaterial,
  addInvoice,
  truckingRates,
};
