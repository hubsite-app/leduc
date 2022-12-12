import ElasticsearchClient from "../../client";
import { MaterialDocument } from "@models";
import { logger } from "@logger";
import { ES_ensureMaterialSettings } from "./settings";
import { ES_ensureMaterialMapping } from "./mapping";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export const ES_ensureMaterialIndex = async () => {
  await ES_ensureMaterialSettings();
  await ES_ensureMaterialMapping();

  return;
};

export const ES_updateMaterial = async (material: MaterialDocument) => {
  if (process.env.NODE_ENV === "test") return;

  logger.debug(`Updating material ${material._id} in ES`);

  if (!material.archivedAt) {
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
  } else {
    ElasticsearchClient.get({
      id: material._id.toString(),
      index: ElasticSearchIndices.Material,
    })
      .then(async () => {
        await ElasticsearchClient.delete({
          id: material._id.toString(),
          index: ElasticSearchIndices.Material,
        });
      })
      .catch(() => {
        return;
      });
  }
};

export const ES_clearMaterial = async () => {
  logger.debug("Clearing material index in ES");

  await ElasticsearchClient.indices.delete({
    index: ElasticSearchIndices.Material,
  });

  return;
};
