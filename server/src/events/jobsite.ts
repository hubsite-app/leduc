import {
  JobsiteDayReport,
  JobsiteDocument,
  JobsiteMonthReport,
  JobsiteYearReport,
} from "@models";
import { TypedEvent } from "./typedEvent";

const onJobsiteRequestDayReportGeneration = new TypedEvent<JobsiteDocument>();

const onJobsiteRequestMonthReportGeneration = new TypedEvent<JobsiteDocument>();

const onJobsiteRequestYearReportGeneration = new TypedEvent<JobsiteDocument>();

export const bindJobsiteEvents = () => {
  onJobsiteRequestDayReportGeneration.on(async (jobsite) => {
    await JobsiteDayReport.requestBuildAllForJobsite(jobsite);
  });

  onJobsiteRequestMonthReportGeneration.on(async (jobsite) => {
    const monthReports = await JobsiteMonthReport.getByJobsite(jobsite);

    for (const report of monthReports) {
      await report.requestBuild();
    }
  });

  onJobsiteRequestYearReportGeneration.on(async (jobsite) => {
    const yearReports = await JobsiteYearReport.getByJobsite(jobsite);

    for (const report of yearReports) {
      await report.requestBuild();
    }
  });
};

const jobsiteEvents = {
  onJobsiteRequestDayReportGeneration,
  onJobsiteRequestMonthReportGeneration,
  onJobsiteRequestYearReportGeneration,
};

export default jobsiteEvents;
