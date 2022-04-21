import { JobsiteYearReportModel } from "@models";
import { IJobsiteReportBuild } from "@typescript/jobsiteReports";
import { UpdateStatus } from "@typescript/models";
import dayjs from "dayjs";

const requestBuild = (
  JobsiteYearReport: JobsiteYearReportModel,
  data: IJobsiteReportBuild
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Try to find existing
      let jobsiteYearReport = await JobsiteYearReport.getByJobsiteAndDate(
        data.jobsiteId,
        data.date
      );

      if (!jobsiteYearReport) {
        jobsiteYearReport = new JobsiteYearReport({
          jobsite: data.jobsiteId,
          startOfYear: dayjs(data.date).startOf("year").toDate(),
        });
      }

      if (jobsiteYearReport.update.status !== UpdateStatus.Pending)
        jobsiteYearReport.update.status = UpdateStatus.Requested;

      await jobsiteYearReport.save();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  requestBuild,
};
