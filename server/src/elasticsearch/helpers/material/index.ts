import ElasticsearchClient from "../../client";
import { MaterialDocument } from "@models";
import { logger } from "@logger";
import { ES_ensureMaterialSettings } from "./settings";
import { ES_ensureMaterialMapping } from "./mapping";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export const ES_ensureMaterialIndex = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await ES_ensureMaterialSettings();
      await ES_ensureMaterialMapping();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const ES_updateMaterial = (material: MaterialDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (process.env.NODE_ENV !== "test") {
        logger.debug(`Updating material ${material._id} in ES`);
        await ElasticsearchClient.update({
          index: ElasticSearchIndices.Material,
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

export const ES_clearMaterial = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      logger.debug(`Clearing material index in ES`);

      await ElasticsearchClient.indices.delete({
        index: ElasticSearchIndices.Material,
      });

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
