import ElasticsearchClient from "../../client";
import { CrewDocument, DailyReportDocument, JobsiteDocument } from "@models";
import { logger } from "@logger";
import { ES_ensureDailyReportSettings } from "./settings";
import { ES_ensureDailyReportMapping } from "./mapping";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export const ES_ensureDailyReportIndex = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await ES_ensureDailyReportSettings();
      await ES_ensureDailyReportMapping();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const ES_updateDailyReport = (dailyReport: DailyReportDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (process.env.NODE_ENV !== "test") {
        logger.debug(`Updating dailyReport ${dailyReport._id} in ES`);

        let crew: CrewDocument | undefined = undefined,
          jobsite: JobsiteDocument | undefined = undefined;
        try {
          jobsite = await dailyReport.getJobsite();
          crew = await dailyReport.getCrew();
        } catch (e) {
          logger.error(e);
        }

        await ElasticsearchClient.update({
          index: ElasticSearchIndices.DailyReport,
          id: dailyReport._id.toString(),
          body: {
            doc: {
              daily_report: {
                date: dailyReport.date,
                jobsiteName: jobsite?.name || "",
                jobsiteCode: jobsite?.jobcode || "",
                crewName: crew?.name || "",
              },
            },
            doc_as_upsert: true,
          },
        });
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
