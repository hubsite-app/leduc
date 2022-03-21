import { Types } from "mongoose";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";
import ElasticsearchClient from "@elasticsearch/client";
import { MaterialDocument, MaterialModel } from "@models";
import { IMaterialSearchObject } from "@typescript/material";
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
  Material: MaterialModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<MaterialDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const material = await Material.findById(id);

      if (!material && options.throwError) {
        throw new Error("Material.getById: unable to find material");
      }

      resolve(material);
    } catch (e) {
      reject(e);
    }
  });
};

const byName = (Material: MaterialModel, name: string) => {
  return new Promise<MaterialDocument | null>(async (resolve, reject) => {
    try {
      const material = await Material.findOne({
        name: { $regex: new RegExp(name, "i") },
      });

      resolve(material);
    } catch (e) {
      reject(e);
    }
  });
};

const search = (
  Material: MaterialModel,
  searchString: string,
  options?: ISearchOptions
) => {
  return new Promise<IMaterialSearchObject[]>(async (resolve, reject) => {
    try {
      const res = await ElasticsearchClient.search({
        index: ElasticSearchIndices.Material,
        body: {
          query: {
            multi_match: {
              query: searchString.toLowerCase(),
              fuzziness: "AUTO",
              fields: ["material.name^2"],
            },
          },
        },
        size: options?.limit,
      });

      let materialObjects: { id: string; score: number }[] =
        res.body.hits.hits.map((item: any) => {
          return {
            id: item._id,
            score: item._score,
          };
        });

      // Filter out blacklisted ids
      if (options?.blacklistedIds) {
        materialObjects = materialObjects.filter(
          (object) => !options.blacklistedIds?.includes(object.id)
        );
      }

      const materials: IMaterialSearchObject[] = [];
      for (let i = 0; i < materialObjects.length; i++) {
        const material = await Material.getById(materialObjects[i].id);
        if (material)
          materials.push({
            material,
            score: materialObjects[i].score,
          });
      }

      resolve(materials);
    } catch (e) {
      reject(e);
    }
  });
};

const listDefaultOptions: IListOptions<MaterialDocument> = {
  pageLimit: 25,
  offset: 0,
};
const list = (
  Material: MaterialModel,
  options?: IListOptions<MaterialDocument>
) => {
  return new Promise<MaterialDocument[]>(async (resolve, reject) => {
    try {
      options = populateOptions(options, listDefaultOptions);

      const materials = await Material.find(options?.query || {}, undefined, {
        limit: options?.pageLimit,
        skip: options?.offset,
        sort: {
          date: -1,
        },
      });

      resolve(materials);
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
