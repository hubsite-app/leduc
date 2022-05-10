import _ from "lodash";

import ElasticsearchClient from "../../client";
import { logger } from "@logger";
import CompanyMapping from "../../mappings/company.json";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export * from "./settings";

export const ES_ensureCompanyMapping = async () => {
  const exists = (
    await ElasticsearchClient.indices.exists({
      index: ElasticSearchIndices.Company,
    })
  ).body;

  if (exists === false) {
    // If no index exists, create with mapping

    logger.info("Creating company ES index");
    await ElasticsearchClient.indices.create({
      index: ElasticSearchIndices.Company,
      body: {
        mappings: CompanyMapping,
      },
    });
  } else {
    // If exists, ensure mapping matches

    const currentMapping = (
      await ElasticsearchClient.indices.getMapping({
        index: ElasticSearchIndices.Company,
      })
    ).body[ElasticSearchIndices.Company].mappings;

    if (
      !_.isEqual(
        JSON.parse(JSON.stringify(currentMapping)),
        JSON.parse(JSON.stringify(CompanyMapping))
      )
    ) {
      // Mappings do not match, update ES map

      logger.info("Updating company ES index mapping");
      await ElasticsearchClient.indices.putMapping({
        index: ElasticSearchIndices.Company,
        body: CompanyMapping,
      });
    }
  }

  return;
};
