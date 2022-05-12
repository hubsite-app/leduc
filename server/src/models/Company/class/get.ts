import { Types } from "mongoose";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";
import ElasticsearchClient from "@elasticsearch/client";
import { CompanyDocument, CompanyModel } from "@models";
import { ICompanySearchObject } from "@typescript/company";
import {
  GetByIDOptions,
  IListOptions,
  ISearchOptions,
} from "@typescript/models";
import populateOptions from "@utils/populateOptions";
import { IHit } from "@typescript/elasticsearch";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = async (
  Company: CompanyModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
): Promise<CompanyDocument | null> => {
  options = populateOptions(options, byIdDefaultOptions);

  const company = await Company.findById(id);

  if (!company && options.throwError) {
    throw new Error("Company.getById: unable to find company");
  }

  return company;
};

const byName = async (
  Company: CompanyModel,
  name: string
): Promise<CompanyDocument | null> => {
  const company = await Company.findOne({
    name: { $regex: new RegExp(name, "i") },
  });

  return company;
};

const search = async (
  Company: CompanyModel,
  searchString: string,
  options?: ISearchOptions
): Promise<ICompanySearchObject[]> => {
  const res = await ElasticsearchClient.search({
    index: ElasticSearchIndices.Company,
    body: {
      query: {
        multi_match: {
          query: searchString.toLowerCase(),
          fuzziness: "AUTO",
          fields: ["name^2"],
        },
      },
    },
    size: options?.limit,
  });

  let companyObjects: { id: string; score: number }[] = res.body.hits.hits.map(
    (item: IHit) => {
      return {
        id: item._id,
        score: item._score,
      };
    }
  );

  // Filter out blacklisted ids
  if (options?.blacklistedIds) {
    companyObjects = companyObjects.filter(
      (object) => !options.blacklistedIds?.includes(object.id)
    );
  }

  const companys: ICompanySearchObject[] = [];
  for (let i = 0; i < companyObjects.length; i++) {
    const company = await Company.getById(companyObjects[i].id);
    if (company)
      companys.push({
        company,
        score: companyObjects[i].score,
      });
  }

  return companys;
};

const listDefaultOptions: IListOptions<CompanyDocument> = {
  pageLimit: 9999,
  offset: 0,
};
const list = async (
  Company: CompanyModel,
  options?: IListOptions<CompanyDocument>
): Promise<CompanyDocument[]> => {
  options = populateOptions(options, listDefaultOptions);

  const companys = await Company.find(options?.query || {}, undefined, {
    limit: options?.pageLimit,
    skip: options?.offset,
    sort: {
      name: -1,
    },
  });

  return companys;
};

export default {
  byId,
  byName,
  search,
  list,
};
