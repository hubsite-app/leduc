import _ from "lodash";

import ElasticsearchClient from "../../client";
import { logger } from "@logger";
import DailyReportMapping from "../../mappings/dailyReport.json";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export * from "./settings";

export const ES_ensureDailyReportMapping = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const exists = (
        await ElasticsearchClient.indices.exists({
          index: ElasticSearchIndices.DailyReport,
        })
      ).body;

      if (exists === false) {
        // If no index exists, create with mapping

        logger.info("Creating dailyReport ES index");
        await ElasticsearchClient.indices.create({
          index: ElasticSearchIndices.DailyReport,
          body: {
            mappings: DailyReportMapping,
          },
        });
      } else {
        // If exists, ensure mapping matches

        const currentMapping = (
          await ElasticsearchClient.indices.getMapping({
            index: ElasticSearchIndices.DailyReport,
          })
        ).body[ElasticSearchIndices.DailyReport].mappings;

        if (
          !_.isEqual(
            JSON.parse(JSON.stringify(currentMapping)),
            JSON.parse(JSON.stringify(DailyReportMapping))
          )
        ) {
          // Mappings do not match, update ES map

          logger.info("Updating dailyReport ES index mapping");
          await ElasticsearchClient.indices.putMapping({
            index: ElasticSearchIndices.DailyReport,
            body: DailyReportMapping,
          });
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
