import { DailyReportDocument } from "@models";
import { IDailyReportUpdate } from "@typescript/dailyReport";

const document = (
  dailyReport: DailyReportDocument,
  data: IDailyReportUpdate
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      dailyReport.date = data.date;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
