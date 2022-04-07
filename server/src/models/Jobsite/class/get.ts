import { Types } from "mongoose";

import {
  Crew,
  CrewDocument,
  DailyReport,
  DailyReportDocument,
  Invoice,
  InvoiceDocument,
  JobsiteDocument,
  JobsiteMaterial,
  JobsiteMaterialDocument,
  JobsiteModel,
  MaterialShipment,
  MaterialShipmentDocument,
} from "@models";
import { GetByIDOptions, Id, ISearchOptions } from "@typescript/models";
import populateOptions from "@utils/populateOptions";
import { IJobsiteSearchObject } from "@typescript/jobsite";
import ElasticsearchClient from "@elasticsearch/client";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  Jobsite: JobsiteModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<JobsiteDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const jobsite = await Jobsite.findById(id);

      if (!jobsite && options.throwError) {
        throw new Error("Jobsite.getById: unable to find jobsite");
      }

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

const search = (
  Jobsite: JobsiteModel,
  searchString: string,
  options?: ISearchOptions
) => {
  return new Promise<IJobsiteSearchObject[]>(async (resolve, reject) => {
    try {
      const res = await ElasticsearchClient.search({
        index: ElasticSearchIndices.Jobsite,
        body: {
          query: {
            multi_match: {
              query: searchString.toLowerCase(),
              fuzziness: "AUTO",
              fields: ["name", "jobcode"],
            },
          },
        },
        size: options?.limit,
      });

      let jobsiteObjects: { id: string; score: number }[] =
        res.body.hits.hits.map((item: any) => {
          return {
            id: item._id,
            score: item._score,
          };
        });

      // Filter out blacklisted ids
      if (options?.blacklistedIds) {
        jobsiteObjects = jobsiteObjects.filter(
          (object) => !options.blacklistedIds?.includes(object.id)
        );
      }

      const jobsites: IJobsiteSearchObject[] = [];
      for (let i = 0; i < jobsiteObjects.length; i++) {
        const jobsite = await Jobsite.getById(jobsiteObjects[i].id);
        if (jobsite)
          jobsites.push({
            jobsite,
            score: jobsiteObjects[i].score,
          });
      }

      resolve(jobsites);
    } catch (e) {
      reject(e);
    }
  });
};

const byCrew = (Jobsite: JobsiteModel, crew: CrewDocument) => {
  return new Promise<JobsiteDocument[]>(async (resolve, reject) => {
    try {
      const jobsites = await Jobsite.find({ crews: crew._id });

      resolve(jobsites);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * ----- Methods -----
 */

const crews = (jobsite: JobsiteDocument) => {
  return new Promise<CrewDocument[]>(async (resolve, reject) => {
    try {
      const crews = await Crew.find({ _id: { $in: jobsite.crews } });

      resolve(crews);
    } catch (e) {
      reject(e);
    }
  });
};

const dailyReports = (jobsite: JobsiteDocument) => {
  return new Promise<DailyReportDocument[]>(async (resolve, reject) => {
    try {
      const dailyReports = await DailyReport.find({
        jobsite: jobsite._id,
      }).sort({ date: -1 });

      resolve(dailyReports);
    } catch (e) {
      reject(e);
    }
  });
};

const materials = (jobsite: JobsiteDocument) => {
  return new Promise<JobsiteMaterialDocument[]>(async (resolve, reject) => {
    try {
      const jobsiteMaterials = await JobsiteMaterial.find({
        _id: { $in: jobsite.materials },
      });

      resolve(jobsiteMaterials);
    } catch (e) {
      reject(e);
    }
  });
};

const expenseInvoices = (jobsite: JobsiteDocument) => {
  return new Promise<InvoiceDocument[]>(async (resolve, reject) => {
    try {
      const invoices = await Invoice.find({
        _id: { $in: jobsite.expenseInvoices },
      });

      resolve(invoices);
    } catch (e) {
      reject(e);
    }
  });
};

const revenueInvoices = (jobsite: JobsiteDocument) => {
  return new Promise<InvoiceDocument[]>(async (resolve, reject) => {
    try {
      const invoices = await Invoice.find({
        _id: { $in: jobsite.revenueInvoices },
      });

      resolve(invoices);
    } catch (e) {
      reject(e);
    }
  });
};

const nonCostedMaterialShipments = (jobsite: JobsiteDocument) => {
  return new Promise<MaterialShipmentDocument[]>(async (resolve, reject) => {
    try {
      const dailyReports = await jobsite.getDailyReports();

      const materialShipmentIds: Id[] = [];
      for (let i = 0; i < dailyReports.length; i++) {
        materialShipmentIds.push.apply(
          materialShipmentIds,
          dailyReports[i].materialShipment.map((id) => id!.toString())
        );
      }

      const materialShipments = await MaterialShipment.find({
        _id: { $in: materialShipmentIds },
        noJobsiteMaterial: true,
      });

      resolve(materialShipments);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  search,
  byCrew,
  crews,
  dailyReports,
  materials,
  expenseInvoices,
  revenueInvoices,
  nonCostedMaterialShipments,
};
