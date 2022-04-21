import { JobsiteYearMasterReportDocument } from "@models";
import { UpdateStatus } from "@typescript/models";

const document = (jobsiteYearMasterReport: JobsiteYearMasterReportDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await jobsiteYearMasterReport.generateFull();

      jobsiteYearMasterReport.update.status = UpdateStatus.Updated;
      jobsiteYearMasterReport.update.lastUpdatedAt = new Date();

      await jobsiteYearMasterReport.save();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
