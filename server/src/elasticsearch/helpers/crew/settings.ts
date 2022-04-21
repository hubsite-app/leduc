import ElasticSearchIndices from "@constants/ElasticSearchIndices";
import ElasticsearchClient from "@elasticsearch/client";

import CrewSettings from "../../settings/crew.json";

export const ES_ensureCrewSettings = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const exists = (
        await ElasticsearchClient.indices.exists({
          index: ElasticSearchIndices.Crew,
        })
      ).body;

      if (!exists) {
        await ElasticsearchClient.indices.create({
          index: ElasticSearchIndices.Crew,
        });
      }

      // Put Settings
      await ElasticsearchClient.indices.close({
        index: ElasticSearchIndices.Crew,
      });
      await ElasticsearchClient.indices.putSettings({
        index: ElasticSearchIndices.Crew,
        body: {
          max_ngram_diff: 20,
          ...CrewSettings,
        },
      });
      await ElasticsearchClient.indices.open({
        index: ElasticSearchIndices.Crew,
      });

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
