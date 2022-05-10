import ElasticSearchIndices from "@constants/ElasticSearchIndices";
import ElasticsearchClient from "@elasticsearch/client";

import DailyReportSettings from "../../settings/dailyReport.json";

export const ES_ensureDailyReportSettings = async () => {
  const exists = (
    await ElasticsearchClient.indices.exists({
      index: ElasticSearchIndices.DailyReport,
    })
  ).body;

  if (!exists) {
    await ElasticsearchClient.indices.create({
      index: ElasticSearchIndices.DailyReport,
    });
  }

  // Put Settings
  await ElasticsearchClient.indices.close({
    index: ElasticSearchIndices.DailyReport,
  });
  await ElasticsearchClient.indices.putSettings({
    index: ElasticSearchIndices.DailyReport,
    body: {
      max_ngram_diff: 20,
      ...DailyReportSettings,
    },
  });
  await ElasticsearchClient.indices.open({
    index: ElasticSearchIndices.DailyReport,
  });

  return;
};
