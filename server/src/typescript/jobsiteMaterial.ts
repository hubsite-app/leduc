import { CompanyDocument, JobsiteDocument, MaterialDocument } from "@models";
import { IDefaultRateData, RateClass } from "./models";

export interface IJobsiteMaterialCreate {
  jobsite: JobsiteDocument;
  material: MaterialDocument;
  supplier: CompanyDocument;
  quantity: number;
  unit: string;
  rates: RateClass[];
  delivered: boolean;
  deliveredRates: IDefaultRateData[];
}

export interface IJobsiteMaterialUpdate {
  supplier: CompanyDocument;
  quantity: number;
  unit: string;
  rates: RateClass[];
  delivered: boolean;
  deliveredRates: IDefaultRateData[];
}
