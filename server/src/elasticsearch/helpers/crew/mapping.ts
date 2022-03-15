import _ from "lodash";

import ElasticsearchClient from "../../client";
import { logger } from "@logger";
import CrewMapping from "../../mappings/crew.json";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export * from "./settings";

export const ES_ensureCrewMapping = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const exists = (
        await ElasticsearchClient.indices.exists({
          index: ElasticSearchIndices.Crew,
        })
      ).body;

      if (exists === false) {
        // If no index exists, create with mapping

        logger.info("Creating crew ES index");
        await ElasticsearchClient.indices.create({
          index: ElasticSearchIndices.Crew,
          body: {
            mappings: CrewMapping,
          },
        });
      } else {
        // If exists, ensure mapping matches

        const currentMapping = (
          await ElasticsearchClient.indices.getMapping({
            index: ElasticSearchIndices.Crew,
          })
        ).body[ElasticSearchIndices.Crew].mappings;

        if (
          !_.isEqual(
            JSON.parse(JSON.stringify(currentMapping)),
            JSON.parse(JSON.stringify(CrewMapping))
          )
        ) {
          // Mappings do not match, update ES map

          logger.info("Updating crew ES index mapping");
          await ElasticsearchClient.indices.putMapping({
            index: ElasticSearchIndices.Crew,
            body: CrewMapping,
          });
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
