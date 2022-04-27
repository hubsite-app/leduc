import { DailyReportDocument, JobsiteMaterialDocument } from "@models";
import { Id } from "./models";

interface IMaterialShipmentCreateBase {
  startTime?: Date;
  endTime?: Date;
  vehicleObject?: {
    source: string;
    vehicleType: string;
    vehicleCode: string;
    truckingRateId?: string;
    deliveredRateId?: Id;
  };
  dailyReport: DailyReportDocument;
}

export interface IMaterialShipmentShipmentUpdate {
  noJobsiteMaterial: boolean;
  jobsiteMaterial?: JobsiteMaterialDocument;
  shipmentType?: string;
  supplier?: string;
  unit?: string;
}

export interface IMaterialShipmentCreate
  extends IMaterialShipmentCreateBase,
    IMaterialShipmentShipmentUpdate {
  quantity: number;
}

export interface IMaterialShipmentUpdate
  extends IMaterialShipmentShipmentUpdate {
  quantity: number;
  startTime?: Date;
  endTime?: Date;
}
