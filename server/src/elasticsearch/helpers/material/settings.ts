import ElasticSearchIndices from "@constants/ElasticSearchIndices";
import ElasticsearchClient from "@elasticsearch/client";

import MaterialSettings from "../../settings/material.json";

export const ES_ensureMaterialSettings = async () => {
  const exists = (
    await ElasticsearchClient.indices.exists({
      index: ElasticSearchIndices.Material,
    })
  ).body;

  if (!exists) {
    await ElasticsearchClient.indices.create({
      index: ElasticSearchIndices.Material,
    });
  }

  // Put Settings
  await ElasticsearchClient.indices.close({
    index: ElasticSearchIndices.Material,
  });
  await ElasticsearchClient.indices.putSettings({
    index: ElasticSearchIndices.Material,
    body: {
      max_ngram_diff: 20,
      ...MaterialSettings,
    },
  });
  await ElasticsearchClient.indices.open({
    index: ElasticSearchIndices.Material,
  });

  return;
};
