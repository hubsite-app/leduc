import { DefaultRateData } from "@graphql/types/mutation";
import {
  Company,
  Invoice,
  Jobsite,
  JobsiteDocument,
  JobsiteMaterial,
  Material,
} from "@models";
import { TruckingRateTypes } from "@typescript/jobsite";
import { Field, InputType } from "type-graphql";
import { InvoiceData } from "../invoice/mutations";
import { JobsiteMaterialCreateData } from "../jobsiteMaterial/mutations";

@InputType()
export class JobsiteCreateData {
  @Field({ nullable: false })
  public name!: string;

  @Field({ nullable: false })
  public jobcode!: string;

  @Field({ nullable: true })
  public description?: string;
}

@InputType()
export class TruckingRateData extends DefaultRateData {
  @Field({ nullable: false })
  public type!: TruckingRateTypes;
}

const create = (data: JobsiteCreateData) => {
  return new Promise<JobsiteDocument>(async (resolve, reject) => {
    try {
      const jobsite = await Jobsite.createDocument(data);

      await jobsite.save();

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

const addMaterial = (jobsiteId: string, data: JobsiteMaterialCreateData) => {
  return new Promise<JobsiteDocument>(async (resolve, reject) => {
    try {
      const jobsite = (await Jobsite.getById(jobsiteId, { throwError: true }))!;

      const material = (await Material.getById(data.materialId, {
        throwError: true,
      }))!;
      const supplier = (await Company.getById(data.supplierId, {
        throwError: true,
      }))!;

      const jobsiteMaterial = await JobsiteMaterial.createDocument({
        ...data,
        jobsite,
        material,
        supplier,
      });

      await jobsiteMaterial.save();

      await jobsite.save();

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

const addInvoice = (jobsiteId: string, data: InvoiceData) => {
  return new Promise<JobsiteDocument>(async (resolve, reject) => {
    try {
      const jobsite = (await Jobsite.getById(jobsiteId, { throwError: true }))!;

      const company = (await Company.getById(data.companyId, {
        throwError: true,
      }))!;

      const invoice = await Invoice.createDocument({
        ...data,
        jobsite,
        company,
      });

      await invoice.save();

      await jobsite.save();

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

const setTruckingRates = (jobsiteId: string, data: TruckingRateData[]) => {
  return new Promise<JobsiteDocument>(async (resolve, reject) => {
    try {
      const jobsite = (await Jobsite.getById(jobsiteId, { throwError: true }))!;

      await jobsite.setTruckingRates(data);

      await jobsite.save();

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  create,
  addMaterial,
  addInvoice,
  setTruckingRates,
};
