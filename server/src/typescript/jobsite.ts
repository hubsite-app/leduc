import { JobsiteDocument } from "@models";

export interface IJobsiteCreate {
  name: string;
  jobcode: string;
  location_url?: string;
  description?: string;
}

export interface IJobsiteSearchObject {
  score: number;
  jobsite: JobsiteDocument;
}
