import { JobsiteDocument } from "@models";
import { IDefaultRateData } from "./models";

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

export enum TruckingRateTypes {
  Hour = "Hour",
  Quantity = "Quantity",
}

export interface ITruckingRateData extends IDefaultRateData {
  type: TruckingRateTypes;
}
