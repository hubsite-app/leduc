import winston from "winston";
import {
  ElasticsearchTransport,
  ElasticsearchTransportOptions,
} from "winston-elasticsearch";

const esTransportOpts: ElasticsearchTransportOptions = {
  level: "info",
  clientOpts: {
    node: "http://elasticsearch-client.kube-devops.svc:9200",
    auth: {
      username: "elastic",
      password: (process.env.ELASTICSEARCH_PASSWORD as string) || "changeme",
    },
  },
};

const consoleTransport = new winston.transports.Console({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
});

const esTransport = new ElasticsearchTransport(esTransportOpts);

export const logger = winston.createLogger({
  transports: [esTransport, consoleTransport],
});

/**
 * Compulsory error handling
 */

logger.on("error", (error) => {
  console.error("Error in logger caught", error);
});
esTransport.on("error", (error) => {
  console.error("Error in logger caught", error);
});
