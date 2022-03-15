import ElasticsearchClient from "../../client";
import { CrewDocument } from "@models";
import { logger } from "@logger";
import { ES_ensureCrewSettings } from "./settings";
import { ES_ensureCrewMapping } from "./mapping";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export const ES_ensureCrewIndex = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await ES_ensureCrewSettings();
      await ES_ensureCrewMapping();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const ES_updateCrew = (crew: CrewDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (process.env.NODE_ENV !== "test") {
        logger.debug(`Updating crew ${crew._id} in ES`);
        await ElasticsearchClient.update({
          index: ElasticSearchIndices.Crew,
          id: crew._id.toString(),
          body: {
            doc: {
              crew: {
                name: crew.name,
              },
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
