import { JobsiteDocument } from "@models";
import { registerEnumType } from "type-graphql";
import { IDefaultRateData, IRatesData } from "./models";

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

registerEnumType(TruckingRateTypes, {
  name: "TruckingRateTypes",
});

export interface ITruckingRateData extends IRatesData {
  type: TruckingRateTypes;
}

export interface ITruckingTypeRateData extends IDefaultRateData {
  rates: ITruckingRateData[];
}
