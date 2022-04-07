import { CompanyDocument, JobsiteDocument, MaterialDocument } from "@models";
import { RateClass } from "./models";

export interface IJobsiteMaterialCreate {
  jobsite: JobsiteDocument;
  material: MaterialDocument;
  supplier: CompanyDocument;
  quantity: number;
  unit: string;
  rates: RateClass[];
}

export interface IJobsiteMaterialUpdate {
  supplier: CompanyDocument;
  quantity: number;
  unit: string;
  rates: RateClass[];
}
