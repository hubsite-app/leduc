import _ from "lodash";

import ElasticsearchClient from "../../client";
import { logger } from "@logger";
import JobsiteMapping from "../../mappings/jobsite.json";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export * from "./settings";

export const ES_ensureJobsiteMapping = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const exists = (
        await ElasticsearchClient.indices.exists({
          index: ElasticSearchIndices.Jobsite,
        })
      ).body;

      if (exists === false) {
        // If no index exists, create with mapping

        logger.info("Creating jobsite ES index");
        await ElasticsearchClient.indices.create({
          index: ElasticSearchIndices.Jobsite,
          body: {
            mappings: JobsiteMapping,
          },
        });
      } else {
        // If exists, ensure mapping matches

        const currentMapping = (
          await ElasticsearchClient.indices.getMapping({
            index: ElasticSearchIndices.Jobsite,
          })
        ).body[ElasticSearchIndices.Jobsite].mappings;

        if (
          !_.isEqual(
            JSON.parse(JSON.stringify(currentMapping)),
            JSON.parse(JSON.stringify(JobsiteMapping))
          )
        ) {
          // Mappings do not match, update ES map

          logger.info("Updating jobsite ES index mapping");
          await ElasticsearchClient.indices.putMapping({
            index: ElasticSearchIndices.Jobsite,
            body: JobsiteMapping,
          });
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
