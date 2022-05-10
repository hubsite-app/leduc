import { JobsiteMonthReportModel } from "@models";
import { IJobsiteMonthReportBuild } from "@typescript/jobsiteMonthReport";
import { UpdateStatus } from "@typescript/models";
import dayjs from "dayjs";

const requestBuild = async (
  JobsiteMonthReport: JobsiteMonthReportModel,
  data: IJobsiteMonthReportBuild
) => {
  // Try to find existing
  let jobsiteMonthReport = await JobsiteMonthReport.getByJobsiteAndDate(
    data.jobsiteId,
    data.date
  );

  if (!jobsiteMonthReport) {
    jobsiteMonthReport = new JobsiteMonthReport({
      jobsite: data.jobsiteId,
      startOfMonth: dayjs(data.date).startOf("month").toDate(),
    });
  }

  if (jobsiteMonthReport.update.status !== UpdateStatus.Pending)
    jobsiteMonthReport.update.status = UpdateStatus.Requested;

  await jobsiteMonthReport.save();

  return;
};

export default {
  requestBuild,
};
