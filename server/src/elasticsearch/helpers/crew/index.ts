import ElasticsearchClient from "../../client";
import { CrewDocument } from "@models";
import { logger } from "@logger";
import { ES_ensureCrewSettings } from "./settings";
import { ES_ensureCrewMapping } from "./mapping";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export const ES_ensureCrewIndex = async () => {
  await ES_ensureCrewSettings();
  await ES_ensureCrewMapping();

  return;
};

export const ES_updateCrew = async (crew: CrewDocument) => {
  if (process.env.NODE_ENV !== "test") {
    logger.debug(`Updating crew ${crew._id} in ES`);

    if (!crew.archivedAt) {
      await ElasticsearchClient.update({
        index: ElasticSearchIndices.Crew,
        id: crew._id.toString(),
        body: {
          doc: {
            name: crew.name,
          },
          doc_as_upsert: true,
        },
      });
    } else {
      const existing = await ElasticsearchClient.get({
        id: crew._id.toString(),
        index: ElasticSearchIndices.Crew,
      });

      // Remove if necessary
      if (existing) {
        await ElasticsearchClient.delete({
          id: crew._id.toString(),
          index: ElasticSearchIndices.Crew,
        });
      }
    }
  }

  return;
};

export const ES_clearCrew = async () => {
  logger.debug("Clearing crew index in ES");

  await ElasticsearchClient.indices.delete({
    index: ElasticSearchIndices.Crew,
  });

  return;
};
