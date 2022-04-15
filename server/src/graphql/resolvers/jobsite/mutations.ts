import { DefaultRateData, RatesData } from "@graphql/types/mutation";
import {
  Company,
  Invoice,
  Jobsite,
  JobsiteDayReportDocument,
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
export class TruckingRateData extends RatesData {
  @Field(() => TruckingRateTypes, { nullable: false })
  public type!: TruckingRateTypes;
}

@InputType()
export class TruckingTypeRateData extends DefaultRateData {
  @Field(() => [TruckingRateData], { nullable: false })
  public rates!: TruckingRateData[];
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

const addExpenseInvoice = (jobsiteId: string, data: InvoiceData) => {
  return new Promise<JobsiteDocument>(async (resolve, reject) => {
    try {
      const jobsite = (await Jobsite.getById(jobsiteId, { throwError: true }))!;

      const company = (await Company.getById(data.companyId, {
        throwError: true,
      }))!;

      const invoice = await Invoice.createDocument({
        ...data,
        company,
      });

      await jobsite.addExpenseInvoice(invoice);

      await invoice.save();

      await jobsite.save();

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

const addRevenueInvoice = (jobsiteId: string, data: InvoiceData) => {
  return new Promise<JobsiteDocument>(async (resolve, reject) => {
    try {
      const jobsite = (await Jobsite.getById(jobsiteId, { throwError: true }))!;

      const company = (await Company.getById(data.companyId, {
        throwError: true,
      }))!;

      const invoice = await Invoice.createDocument({
        ...data,
        company,
      });

      await jobsite.addRevenueInvoice(invoice);

      await invoice.save();

      await jobsite.save();

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

const setTruckingRates = (jobsiteId: string, data: TruckingTypeRateData[]) => {
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

const generateDayReports = (jobsiteId: string) => {
  return new Promise<JobsiteDocument>(async (resolve, reject) => {
    try {
      const jobsite = (await Jobsite.getById(jobsiteId, { throwError: true }))!;

      await jobsite.requestGenerateDayReports();

      resolve(jobsite);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  create,
  addMaterial,
  addExpenseInvoice,
  addRevenueInvoice,
  setTruckingRates,
  generateDayReports,
};
