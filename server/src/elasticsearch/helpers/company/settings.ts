import ElasticSearchIndices from "@constants/ElasticSearchIndices";
import ElasticsearchClient from "@elasticsearch/client";

import CompanySettings from "../../settings/company.json";

export const ES_ensureCompanySettings = async () => {
  const exists = (
    await ElasticsearchClient.indices.exists({
      index: ElasticSearchIndices.Company,
    })
  ).body;

  if (!exists) {
    await ElasticsearchClient.indices.create({
      index: ElasticSearchIndices.Company,
    });
  }

  // Put Settings
  await ElasticsearchClient.indices.close({
    index: ElasticSearchIndices.Company,
  });
  await ElasticsearchClient.indices.putSettings({
    index: ElasticSearchIndices.Company,
    body: {
      max_ngram_diff: 20,
      ...CompanySettings,
    },
  });
  await ElasticsearchClient.indices.open({
    index: ElasticSearchIndices.Company,
  });

  return;
};
