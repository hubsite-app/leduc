import {
  JobsiteDayReportDocument,
  JobsiteDayReportModel,
  JobsiteDocument,
} from "@models";
import { UpdateStatus } from "@typescript/models";
import dayjs from "dayjs";

const allForJobsite = (
  JobsiteDayReport: JobsiteDayReportModel,
  jobsite: JobsiteDocument
) => {
  return new Promise<JobsiteDayReportDocument[]>(async (resolve, reject) => {
    try {
      // Get all existing jobsite daily reports
      const dailyReports = await jobsite.getDailyReports();
      const dailyReportDates = dailyReports
        .filter((report) => report.approved === true)
        .map((report) => report.date);

      // Get all unique dates on this jobsite
      const uniqueDates = dailyReportDates.filter((date, index, array) => {
        let match = false;
        for (let i = index; i >= 0; i--) {
          if (i !== index && dayjs(array[i]).isSame(dayjs(date), "day"))
            match = true;
        }
        return !match;
      });

      const reports: JobsiteDayReportDocument[] = [];
      for (let i = 0; i < uniqueDates.length; i++) {
        reports.push(
          await JobsiteDayReport.requestBuildForJobsiteDay(
            jobsite,
            uniqueDates[i]
          )
        );
      }

      resolve(reports);
    } catch (e) {
      reject(e);
    }
  });
};

const forJobsiteDay = (
  JobsiteDayReport: JobsiteDayReportModel,
  jobsite: JobsiteDocument,
  day: Date
) => {
  return new Promise<JobsiteDayReportDocument>(async (resolve, reject) => {
    try {
      let jobsiteDayReport = await JobsiteDayReport.getByJobsiteAndDay(
        jobsite._id,
        day
      );

      if (!jobsiteDayReport) {
        jobsiteDayReport = await JobsiteDayReport.createDocument(jobsite, day);
      }

      if (jobsiteDayReport.update.status !== UpdateStatus.Pending)
        jobsiteDayReport.update.status = UpdateStatus.Requested;

      await jobsiteDayReport.save();

      resolve(jobsiteDayReport);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  allForJobsite,
  forJobsiteDay,
};
