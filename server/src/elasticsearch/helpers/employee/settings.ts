import ElasticSearchIndices from "@constants/ElasticSearchIndices";
import ElasticsearchClient from "@elasticsearch/client";

import EmployeeSettings from "../../settings/employee.json";

export const ES_ensureEmployeeSettings = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const exists = (
        await ElasticsearchClient.indices.exists({
          index: ElasticSearchIndices.Employee,
        })
      ).body;

      if (!exists) {
        await ElasticsearchClient.indices.create({
          index: ElasticSearchIndices.Employee,
        });
      }

      // Put Settings
      await ElasticsearchClient.indices.close({
        index: ElasticSearchIndices.Employee,
      });
      await ElasticsearchClient.indices.putSettings({
        index: ElasticSearchIndices.Employee,
        body: {
          max_ngram_diff: 20,
          ...EmployeeSettings,
        },
      });
      await ElasticsearchClient.indices.open({
        index: ElasticSearchIndices.Employee,
      });

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
