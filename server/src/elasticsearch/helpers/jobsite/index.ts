import ElasticsearchClient from "../../client";
import { JobsiteDocument } from "@models";
import { logger } from "@logger";
import { ES_ensureJobsiteSettings } from "./settings";
import { ES_ensureJobsiteMapping } from "./mapping";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export const ES_ensureJobsiteIndex = async () => {
  await ES_ensureJobsiteSettings();
  await ES_ensureJobsiteMapping();

  return;
};

export const ES_updateJobsite = async (jobsite: JobsiteDocument) => {
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

  return;
};

export const ES_clearJobsite = async () => {
  logger.debug("Clearing jobsite index in ES");

  await ElasticsearchClient.indices.delete({
    index: ElasticSearchIndices.Jobsite,
  });

  return;
};
