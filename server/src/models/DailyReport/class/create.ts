import { DailyReportDocument, DailyReportModel } from "@models";
import { IDailyReportCreate } from "@typescript/dailyReport";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const document = async (
  DailyReport: DailyReportModel,
  data: IDailyReportCreate
): Promise<DailyReportDocument> => {
  const existingReport = await DailyReport.getExistingReport(
    data.jobsite._id,
    data.crew._id,
    data.date
  );
  if (existingReport)
    throw new Error("DailyReport.createDocument: a report already exists");

  const dailyReport = new DailyReport({
    crew: data.crew._id,
    jobsite: data.jobsite._id,
    date: data.date,
  });

  return dailyReport;
};

export default {
  document,
};
