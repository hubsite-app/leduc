import { DailyReportDocument, JobsiteMaterialDocument } from "@models";

interface IMaterialShipmentCreateBase {
  startTime?: Date;
  endTime?: Date;
  vehicleObject: {
    source: string;
    vehicleType: string;
    vehicleCode: string;
    truckingRateId: string;
  };
  dailyReport: DailyReportDocument;
}

export interface IMaterialShipmentCreate extends IMaterialShipmentCreateBase {
  quantity: number;
  jobsiteMaterial: JobsiteMaterialDocument;
}

export interface IMaterialShipmentUpdate {
  jobsiteMaterial: JobsiteMaterialDocument;
  quantity: number;
  startTime?: Date;
  endTime?: Date;
}

export interface IMaterialShipmentUpdateV1 {
  shipmentType: string;
  quantity: number;
  unit: string;
  startTime?: Date;
  endTime?: Date;
  supplier?: string;
}
