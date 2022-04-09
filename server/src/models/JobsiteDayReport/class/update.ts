import { JobsiteDayReportDocument } from "@models";

const document = (jobsiteDayReport: JobsiteDayReportDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await jobsiteDayReport.generateReports();

      await jobsiteDayReport.save();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
