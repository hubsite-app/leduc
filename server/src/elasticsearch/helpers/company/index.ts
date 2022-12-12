import ElasticsearchClient from "../../client";
import { CompanyDocument } from "@models";
import { logger } from "@logger";
import { ES_ensureCompanySettings } from "./settings";
import { ES_ensureCompanyMapping } from "./mapping";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export const ES_ensureCompanyIndex = async () => {
  await ES_ensureCompanySettings();
  await ES_ensureCompanyMapping();

  return;
};

export const ES_updateCompany = async (company: CompanyDocument) => {
  if (process.env.NODE_ENV === "test") return;

  logger.debug(`Updating company ${company._id} in ES`);

  if (!company.archivedAt) {
    await ElasticsearchClient.update({
      index: ElasticSearchIndices.Company,
      id: company._id.toString(),
      body: {
        doc: {
          name: company.name,
        },
        doc_as_upsert: true,
      },
    });
  } else {
    ElasticsearchClient.get({
      id: company._id.toString(),
      index: ElasticSearchIndices.Company,
    })
      .then(async () => {
        await ElasticsearchClient.delete({
          id: company._id.toString(),
          index: ElasticSearchIndices.Company,
        });
      })
      .catch(() => {
        return;
      });
  }
};

export const ES_clearCompany = async () => {
  logger.debug("Clearing company index in ES");

  await ElasticsearchClient.indices.delete({
    index: ElasticSearchIndices.Company,
  });

  return;
};
