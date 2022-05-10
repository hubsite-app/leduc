import _ from "lodash";

import ElasticsearchClient from "../../client";
import { logger } from "@logger";
import MaterialMapping from "../../mappings/material.json";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export * from "./settings";

export const ES_ensureMaterialMapping = async () => {
  const exists = (
    await ElasticsearchClient.indices.exists({
      index: ElasticSearchIndices.Material,
    })
  ).body;

  if (exists === false) {
    // If no index exists, create with mapping

    logger.info("Creating material ES index");
    await ElasticsearchClient.indices.create({
      index: ElasticSearchIndices.Material,
      body: {
        mappings: MaterialMapping,
      },
    });
  } else {
    // If exists, ensure mapping matches

    const currentMapping = (
      await ElasticsearchClient.indices.getMapping({
        index: ElasticSearchIndices.Material,
      })
    ).body[ElasticSearchIndices.Material].mappings;

    if (
      !_.isEqual(
        JSON.parse(JSON.stringify(currentMapping)),
        JSON.parse(JSON.stringify(MaterialMapping))
      )
    ) {
      // Mappings do not match, update ES map

      logger.info("Updating material ES index mapping");
      await ElasticsearchClient.indices.putMapping({
        index: ElasticSearchIndices.Material,
        body: MaterialMapping,
      });
    }
  }

  return;
};
