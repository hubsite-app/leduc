import { CompanyDocument, JobsiteDocument, MaterialDocument } from "@models";

export interface IJobsiteMaterialCreate {
  jobsite: JobsiteDocument;
  material: MaterialDocument;
  supplier: CompanyDocument;
  quantity: number;
  unit: string;
  rate: number;
}

export interface IJobsiteMaterialUpdate {
  supplier: CompanyDocument;
  quantity: number;
  unit: string;
  rate: number;
}
