import { JobsiteDocument } from "@models";

export interface IJobsiteSearchObject {
  score: number;
  jobsite: JobsiteDocument;
}
