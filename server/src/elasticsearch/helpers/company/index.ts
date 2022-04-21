import ElasticsearchClient from "../../client";
import { CompanyDocument } from "@models";
import { logger } from "@logger";
import { ES_ensureCompanySettings } from "./settings";
import { ES_ensureCompanyMapping } from "./mapping";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export const ES_ensureCompanyIndex = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await ES_ensureCompanySettings();
      await ES_ensureCompanyMapping();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const ES_updateCompany = (material: CompanyDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
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

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const ES_clearCompany = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      logger.debug(`Clearing company index in ES`);

      await ElasticsearchClient.indices.delete({
        index: ElasticSearchIndices.Company,
      });

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
