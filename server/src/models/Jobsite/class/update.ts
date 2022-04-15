import {
  InvoiceDocument,
  JobsiteDocument,
  JobsiteMaterialDocument,
  JobsiteMonthReport,
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

      await jobsite.requestGenerateDayReports();

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

      await JobsiteMonthReport.requestBuild({
        date: invoice.date,
        jobsiteId: jobsite._id,
      });

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

      await JobsiteMonthReport.requestBuild({
        date: invoice.date,
        jobsiteId: jobsite._id,
      });

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

      await jobsite.requestGenerateDayReports();

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
