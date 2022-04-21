import _ from "lodash";

import ElasticsearchClient from "../../client";
import { logger } from "@logger";
import VehicleMapping from "../../mappings/vehicle.json";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export * from "./settings";

export const ES_ensureVehicleMapping = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const exists = (
        await ElasticsearchClient.indices.exists({
          index: ElasticSearchIndices.Vehicle,
        })
      ).body;

      if (exists === false) {
        // If no index exists, create with mapping

        logger.info("Creating vehicle ES index");
        await ElasticsearchClient.indices.create({
          index: ElasticSearchIndices.Vehicle,
          body: {
            mappings: VehicleMapping,
          },
        });
      } else {
        // If exists, ensure mapping matches

        const currentMapping = (
          await ElasticsearchClient.indices.getMapping({
            index: ElasticSearchIndices.Vehicle,
          })
        ).body[ElasticSearchIndices.Vehicle].mappings;

        if (
          !_.isEqual(
            JSON.parse(JSON.stringify(currentMapping)),
            JSON.parse(JSON.stringify(VehicleMapping))
          )
        ) {
          // Mappings do not match, update ES map

          logger.info("Updating vehicle ES index mapping");
          await ElasticsearchClient.indices.putMapping({
            index: ElasticSearchIndices.Vehicle,
            body: VehicleMapping,
          });
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
