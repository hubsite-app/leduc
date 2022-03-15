import { CrewDocument, DailyReportDocument, JobsiteDocument } from "@models";

export interface IDailyReportUpdate {
  date: Date;
}

export interface IDailyReportCreate {
  jobsite: JobsiteDocument;
  crew: CrewDocument;
  date: Date;
}

export interface IDailyReportSearchObject {
  score: number;
  dailyReport: DailyReportDocument;
}
