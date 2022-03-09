import { Client } from "@elastic/elasticsearch";

const ElasticsearchClient = new Client({
  node: "http://elasticsearch-client.kube-devops.svc:9200",
  auth: {
    username: "elastic",
    password: (process.env.ELASTICSEARCH_PASSWORD as string) || "changeme",
  },
});

export default ElasticsearchClient;
