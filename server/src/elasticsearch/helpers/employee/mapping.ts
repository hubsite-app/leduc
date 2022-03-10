import _ from "lodash";

import ElasticsearchClient from "../../client";
import { logger } from "@logger";
import EmployeeMapping from "../../mappings/employee.json";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export * from "./settings";

export const ES_ensureEmployeeMapping = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const exists = (
        await ElasticsearchClient.indices.exists({
          index: ElasticSearchIndices.Employee,
        })
      ).body;

      if (exists === false) {
        // If no index exists, create with mapping

        logger.info("Creating employee ES index");
        await ElasticsearchClient.indices.create({
          index: ElasticSearchIndices.Employee,
          body: {
            mappings: EmployeeMapping,
          },
        });
      } else {
        // If exists, ensure mapping matches

        const currentMapping = (
          await ElasticsearchClient.indices.getMapping({
            index: ElasticSearchIndices.Employee,
          })
        ).body[ElasticSearchIndices.Employee].mappings;

        if (
          !_.isEqual(
            JSON.parse(JSON.stringify(currentMapping)),
            JSON.parse(JSON.stringify(EmployeeMapping))
          )
        ) {
          // Mappings do not match, update ES map

          logger.info("Updating employee ES index mapping");
          await ElasticsearchClient.indices.putMapping({
            index: ElasticSearchIndices.Employee,
            body: EmployeeMapping,
          });
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
