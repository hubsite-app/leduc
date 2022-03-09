import ElasticSearchIndices from "@constants/ElasticSearchIndices";
import ElasticsearchClient from "@elasticsearch/client";

import VehicleSettings from "../../settings/vehicle.json";

export const ES_ensureVehicleSettings = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const exists = (
        await ElasticsearchClient.indices.exists({
          index: ElasticSearchIndices.Vehicle,
        })
      ).body;

      if (!exists) {
        await ElasticsearchClient.indices.create({
          index: ElasticSearchIndices.Vehicle,
        });
      }

      // Put Settings
      await ElasticsearchClient.indices.close({
        index: ElasticSearchIndices.Vehicle,
      });
      await ElasticsearchClient.indices.putSettings({
        index: ElasticSearchIndices.Vehicle,
        body: {
          max_ngram_diff: 20,
          ...VehicleSettings,
        },
      });
      await ElasticsearchClient.indices.open({
        index: ElasticSearchIndices.Vehicle,
      });

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
