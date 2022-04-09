import {
  JobsiteDayReportDocument,
  JobsiteDayReportModel,
  JobsiteDocument,
} from "@models";
import dayjs from "dayjs";

const allForJobsite = (
  JobsiteDayReport: JobsiteDayReportModel,
  jobsite: JobsiteDocument
) => {
  return new Promise<JobsiteDayReportDocument[]>(async (resolve, reject) => {
    try {
      // Get all existing reports
      const existingReports = await JobsiteDayReport.getByJobsite(jobsite);
      const existingReportDates = existingReports.map((report) => report.date);

      // Get all existing jobsite daily reports
      const dailyReports = await jobsite.getDailyReports();
      const dailyReportDates = dailyReports.map((report) => report.date);

      // Get all unique dates on this jobsite O(log(n))
      const uniqueDates = dailyReportDates.filter((date, index, array) => {
        let match = false;
        for (let i = index; i >= 0; i--) {
          if (i !== index && dayjs(array[i]).isSame(dayjs(date), "day"))
            match = true;
        }
        return !match;
      });

      // Create a catalog of dates and reports
      const uniqueDateObjects: {
        date: Date;
        report?: JobsiteDayReportDocument;
      }[] = [];
      for (let i = 0; i < uniqueDates.length; i++) {
        const uniqueDate = uniqueDates[i];

        let report: JobsiteDayReportDocument | undefined;
        for (let j = 0; j < existingReportDates.length; j++) {
          if (dayjs(uniqueDate).isSame(dayjs(existingReportDates[j]), "day"))
            report = existingReports[j];
        }

        uniqueDateObjects.push({
          date: uniqueDate,
          report,
        });
      }

      const reports: JobsiteDayReportDocument[] = [];
      for (let i = 0; i < uniqueDateObjects.length; i++) {
        const object = uniqueDateObjects[i];

        if (object.report) {
          await object.report.updateAndSaveDocument();
          reports.push(object.report);
        } else {
          reports.push(
            await JobsiteDayReport.createAndSaveDocument(jobsite, object.date)
          );
        }
      }

      resolve(reports);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  allForJobsite,
};
