import { Client } from "@elastic/elasticsearch";

const ElasticsearchClient = new Client({
  node:
    (process.env.ELASTICSEARCH_URL as string) ||
    "http://elasticsearch-client.kube-devops.svc:9200",
  auth: {
    username: "elastic",
    password: (process.env.ELASTICSEARCH_PASSWORD as string) || "changeme",
  },
});

export default ElasticsearchClient;
