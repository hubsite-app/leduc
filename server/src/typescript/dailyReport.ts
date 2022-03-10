import { DailyReportDocument } from "@models";

export interface IDailyReportUpdate {
  date: Date;
}

export interface IDailyReportSearchObject {
  score: number;
  dailyReport: DailyReportDocument;
}
