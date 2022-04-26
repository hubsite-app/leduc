import ElasticsearchClient from "../../client";
import { CompanyDocument } from "@models";
import { logger } from "@logger";
import { ES_ensureCompanySettings } from "./settings";
import { ES_ensureCompanyMapping } from "./mapping";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export const ES_ensureCompanyIndex = async () => {
  await ES_ensureCompanySettings();
  await ES_ensureCompanyMapping();

  return;
};

export const ES_updateCompany = async (material: CompanyDocument) => {
  if (process.env.NODE_ENV !== "test") {
    logger.debug(`Updating material ${material._id} in ES`);
    await ElasticsearchClient.update({
      index: ElasticSearchIndices.Company,
      id: material._id.toString(),
      body: {
        doc: {
          name: material.name,
        },
        doc_as_upsert: true,
      },
    });
  }

  return;
};

export const ES_clearCompany = async () => {
  logger.debug("Clearing company index in ES");

  await ElasticsearchClient.indices.delete({
    index: ElasticSearchIndices.Company,
  });

  return;
};
