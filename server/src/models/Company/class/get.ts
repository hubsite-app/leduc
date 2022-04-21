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

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  Company: CompanyModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<CompanyDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const company = await Company.findById(id);

      if (!company && options.throwError) {
        throw new Error("Company.getById: unable to find company");
      }

      resolve(company);
    } catch (e) {
      reject(e);
    }
  });
};

const byName = (Company: CompanyModel, name: string) => {
  return new Promise<CompanyDocument | null>(async (resolve, reject) => {
    try {
      const company = await Company.findOne({
        name: { $regex: new RegExp(name, "i") },
      });

      resolve(company);
    } catch (e) {
      reject(e);
    }
  });
};

const search = (
  Company: CompanyModel,
  searchString: string,
  options?: ISearchOptions
) => {
  return new Promise<ICompanySearchObject[]>(async (resolve, reject) => {
    try {
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

      let companyObjects: { id: string; score: number }[] =
        res.body.hits.hits.map((item: any) => {
          return {
            id: item._id,
            score: item._score,
          };
        });

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

      resolve(companys);
    } catch (e) {
      reject(e);
    }
  });
};

const listDefaultOptions: IListOptions<CompanyDocument> = {
  pageLimit: 25,
  offset: 0,
};
const list = (
  Company: CompanyModel,
  options?: IListOptions<CompanyDocument>
) => {
  return new Promise<CompanyDocument[]>(async (resolve, reject) => {
    try {
      options = populateOptions(options, listDefaultOptions);

      const companys = await Company.find(options?.query || {}, undefined, {
        limit: options?.pageLimit,
        skip: options?.offset,
        sort: {
          date: -1,
        },
      });

      resolve(companys);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  byName,
  search,
  list,
};
