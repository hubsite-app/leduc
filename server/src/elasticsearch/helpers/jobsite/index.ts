import ElasticsearchClient from "../../client";
import { JobsiteDocument } from "@models";
import { logger } from "@logger";
import { ES_ensureJobsiteSettings } from "./settings";
import { ES_ensureJobsiteMapping } from "./mapping";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export const ES_ensureJobsiteIndex = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await ES_ensureJobsiteSettings();
      await ES_ensureJobsiteMapping();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const ES_updateJobsite = (jobsite: JobsiteDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (process.env.NODE_ENV !== "test") {
        logger.debug(`Updating jobsite ${jobsite._id} in ES`);
        await ElasticsearchClient.update({
          index: ElasticSearchIndices.Jobsite,
          id: jobsite._id.toString(),
          body: {
            doc: {
              name: jobsite.name,
              jobcode: jobsite.jobcode,
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

export const ES_clearJobsite = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      logger.debug(`Clearing jobsite index in ES`);

      await ElasticsearchClient.indices.delete({
        index: ElasticSearchIndices.Jobsite,
      });

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
