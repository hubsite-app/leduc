import {
  InvoiceDocument,
  JobsiteDocument,
  JobsiteMaterialDocument,
} from "@models";
import { ITruckingTypeRateData } from "@typescript/jobsite";

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

const addExpenseInvoice = (
  jobsite: JobsiteDocument,
  invoice: InvoiceDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const existingIndex = jobsite.expenseInvoices.findIndex(
        (inv) => inv?.toString() === invoice._id.toString()
      );

      if (existingIndex === -1) {
        jobsite.expenseInvoices.push(invoice._id);
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const addRevenueInvoice = (
  jobsite: JobsiteDocument,
  invoice: InvoiceDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const existingIndex = jobsite.revenueInvoices.findIndex(
        (inv) => inv?.toString() === invoice._id.toString()
      );

      if (existingIndex === -1) {
        jobsite.revenueInvoices.push(invoice._id);
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const truckingRates = (
  jobsite: JobsiteDocument,
  truckingRates: ITruckingTypeRateData[]
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
  addExpenseInvoice,
  addRevenueInvoice,
  truckingRates,
};
