import {
  InvoiceDocument,
  JobsiteDocument,
  JobsiteMaterialDocument,
  JobsiteMonthReport,
  JobsiteModel,
  System,
  SystemDocument,
  File,
} from "@models";
import {
  IJobsiteFileObject,
  IJobsiteUpdate,
  ITruckingTypeRateData,
  TruckingRateTypes,
} from "@typescript/jobsite";
import dayjs from "dayjs";

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

const setTruckingRatesToDefault = async (
  jobsite: JobsiteDocument,
  system: SystemDocument
) => {
  jobsite.truckingRates = system.materialShipmentVehicleTypeDefaults.map(
    (type) => {
      return {
        title: type.title,
        rates: type.rates.map((rate) => {
          return {
            date: rate.date,
            rate: rate.rate,
            type: TruckingRateTypes.Hour,
          };
        }),
      };
    }
  );
};

const setAllEmptyTruckingRates = async (Jobsite: JobsiteModel) => {
  const jobsites = await Jobsite.find({
    truckingRates: { $size: 0 },
  });

  const system = await System.getSystem();
  for (let i = 0; i < jobsites.length; i++) {
    await jobsites[i].setTruckingRatesToDefault(system);
  }

  return jobsites;
};

const addTruckingRateToAll = async (
  Jobsite: JobsiteModel,
  systemItemIndex: number,
  systemRateIndex: number
) => {
  const jobsites = await Jobsite.find({
    "truckingRates.0": { $exists: true },
  });

  const updatedJobsites: JobsiteDocument[] = [];

  const system = await System.getSystem();
  if (
    system.materialShipmentVehicleTypeDefaults[systemItemIndex] &&
    system.materialShipmentVehicleTypeDefaults[systemItemIndex].rates[
      systemRateIndex
    ]
  ) {
    const systemRateItem =
      system.materialShipmentVehicleTypeDefaults[systemItemIndex];
    const systemRate = systemRateItem.rates[systemRateIndex];

    for (let i = 0; i < jobsites.length; i++) {
      const jobsite = jobsites[i];

      const matchingRateItemIndex = jobsite.truckingRates.findIndex(
        (jobsiteRateItem) => jobsiteRateItem.title === systemRateItem.title
      );

      if (matchingRateItemIndex !== -1) {
        const jobsiteRateItem = jobsite.truckingRates[matchingRateItemIndex];

        // Ensure last rate isn't after the new rate
        if (
          dayjs(
            jobsiteRateItem.rates[jobsiteRateItem.rates.length - 1].date
          ).isBefore(dayjs(systemRate.date), "day")
        ) {
          // Push system rate
          jobsites[i].truckingRates[matchingRateItemIndex].rates.push({
            rate: systemRate.rate,
            date: systemRate.date,
            type: TruckingRateTypes.Hour,
          });

          updatedJobsites.push(jobsites[i]);
        }
      } else {
        // Push new rate item to jobsite
        jobsites[i].truckingRates.push({
          title: systemRateItem.title,
          rates: [
            {
              date: systemRate.date,
              rate: systemRate.rate,
              type: TruckingRateTypes.Hour,
            },
          ],
        });

        updatedJobsites.push(jobsites[i]);
      }
    }
  }

  return updatedJobsites;
};

const addFileObject = async (
  jobsite: JobsiteDocument,
  fileObject: IJobsiteFileObject
) => {
  const file = await File.createDocument(fileObject.file);

  jobsite.fileObjects.push({
    ...fileObject,
    file,
  });

  return file;
};

export default {
  document,
  addMaterial,
  addExpenseInvoice,
  addRevenueInvoice,
  truckingRates,
  setTruckingRatesToDefault,
  setAllEmptyTruckingRates,
  addTruckingRateToAll,
  addFileObject,
};
