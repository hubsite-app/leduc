import { Jobsite } from "@models";
import dayjs from "dayjs";
import { JobsiteMonthlyReportClass } from "../jobsiteMonthlyReport";

const jobsiteMonthlyReports = (jobsiteId: string) => {
  return new Promise<JobsiteMonthlyReportClass[]>(async (resolve, reject) => {
    try {
      const jobsite = (await Jobsite.getById(jobsiteId, { throwError: true }))!;

      const jobsiteDayReports = await jobsite.getDayReports();

      const sortedDayReports = jobsiteDayReports.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      const monthlyReports: JobsiteMonthlyReportClass[] = [];
      const monthStarts: number[] = [];
      for (let i = 0; i < sortedDayReports.length; i++) {
        const dayReport = sortedDayReports[i];
        const reportStartOfMonth = dayjs(dayReport.date)
          .startOf("month")
          .toDate();

        if (!monthStarts.includes(reportStartOfMonth.getTime())) {
          // Create new report for this month
          monthStarts.push(reportStartOfMonth.getTime());
          monthlyReports.push({
            startOfMonth: reportStartOfMonth,
            dayReports: [dayReport],
          });
        } else {
          // Report already exists for this month, add

          const index = monthlyReports.findIndex(
            (report) =>
              reportStartOfMonth.getTime() === report.startOfMonth.getTime()
          );

          if (index !== -1) {
            monthlyReports[index].dayReports.push(dayReport);
          }
        }
      }

      resolve(monthlyReports);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  jobsiteMonthlyReports,
};
