import { DailyReportDocument } from "@models";

export interface IMaterialShipmentCreate {
  shipmentType: string;
  quantity: number;
  unit: string;
  startTime?: Date;
  endTime?: Date;
  supplier?: string;
  vehicleObject: {
    source: string;
    vehicleType: string;
    vehicleCode: string;
  };
  dailyReport: DailyReportDocument;
}

export interface IMaterialShipmentUpdate {
  shipmentType: string;
  quantity: number;
  unit: string;
  startTime?: Date;
  endTime?: Date;
  supplier?: string;
}
