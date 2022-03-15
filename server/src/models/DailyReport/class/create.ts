import { DailyReportDocument, DailyReportModel } from "@models";
import { IDailyReportCreate } from "@typescript/dailyReport";

const document = (DailyReport: DailyReportModel, data: IDailyReportCreate) => {
  return new Promise<DailyReportDocument>(async (resolve, reject) => {
    try {
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

      resolve(dailyReport);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
