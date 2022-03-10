import ElasticSearchIndices from "@constants/ElasticSearchIndices";
import ElasticsearchClient from "@elasticsearch/client";

import JobsiteSettings from "../../settings/jobsite.json";

export const ES_ensureJobsiteSettings = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const exists = (
        await ElasticsearchClient.indices.exists({
          index: ElasticSearchIndices.Jobsite,
        })
      ).body;

      if (!exists) {
        await ElasticsearchClient.indices.create({
          index: ElasticSearchIndices.Jobsite,
        });
      }

      // Put Settings
      await ElasticsearchClient.indices.close({
        index: ElasticSearchIndices.Jobsite,
      });
      await ElasticsearchClient.indices.putSettings({
        index: ElasticSearchIndices.Jobsite,
        body: {
          max_ngram_diff: 20,
          ...JobsiteSettings,
        },
      });
      await ElasticsearchClient.indices.open({
        index: ElasticSearchIndices.Jobsite,
      });

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
