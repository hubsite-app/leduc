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
import { IHit } from "@typescript/elasticsearch";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = async (
  Material: MaterialModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
): Promise<MaterialDocument | null> => {
  options = populateOptions(options, byIdDefaultOptions);

  const material = await Material.findById(id);

  if (!material && options.throwError) {
    throw new Error("Material.getById: unable to find material");
  }

  return material;
};

const byName = async (
  Material: MaterialModel,
  name: string
): Promise<MaterialDocument | null> => {
  const material = await Material.findOne({
    name: { $regex: new RegExp(name, "i") },
  });

  return material;
};

const search = async (
  Material: MaterialModel,
  searchString: string,
  options?: ISearchOptions
): Promise<IMaterialSearchObject[]> => {
  const res = await ElasticsearchClient.search({
    index: ElasticSearchIndices.Material,
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

  let materialObjects: { id: string; score: number }[] = res.body.hits.hits.map(
    (item: IHit) => {
      return {
        id: item._id,
        score: item._score,
      };
    }
  );

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

  return materials;
};

const listDefaultOptions: IListOptions<MaterialDocument> = {
  pageLimit: 9999,
  offset: 0,
};
const list = async (
  Material: MaterialModel,
  options?: IListOptions<MaterialDocument>
): Promise<MaterialDocument[]> => {
  options = populateOptions(options, listDefaultOptions);

  const materials = await Material.find(options?.query || {}, undefined, {
    limit: options?.pageLimit,
    skip: options?.offset,
    sort: {
      name: "asc",
    },
  });

  return materials;
};

export default {
  byId,
  byName,
  search,
  list,
};
