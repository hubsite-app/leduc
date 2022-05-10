import {
  InvoiceDocument,
  JobsiteDocument,
  JobsiteMaterialDocument,
  JobsiteMonthReport,
} from "@models";
import { IJobsiteUpdate, ITruckingTypeRateData } from "@typescript/jobsite";

const document = async (jobsite: JobsiteDocument, data: IJobsiteUpdate) => {
  jobsite.name = data.name;
};

const addMaterial = async (
  jobsite: JobsiteDocument,
  jobsiteMaterial: JobsiteMaterialDocument
) => {
  const existingIndex = jobsite.materials.findIndex(
    (material) => material?.toString() === jobsiteMaterial._id.toString()
  );

  if (existingIndex === -1) {
    jobsite.materials.push(jobsiteMaterial._id);
  }

  await jobsite.requestGenerateDayReports();

  return;
};

const addExpenseInvoice = async (
  jobsite: JobsiteDocument,
  invoice: InvoiceDocument
) => {
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

  return;
};

const addRevenueInvoice = async (
  jobsite: JobsiteDocument,
  invoice: InvoiceDocument
) => {
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

  return;
};

const truckingRates = async (
  jobsite: JobsiteDocument,
  truckingRates: ITruckingTypeRateData[]
) => {
  jobsite.truckingRates = truckingRates;

  await jobsite.requestGenerateDayReports();

  return;
};

export default {
  document,
  addMaterial,
  addExpenseInvoice,
  addRevenueInvoice,
  truckingRates,
};
