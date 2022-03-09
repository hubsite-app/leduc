import { Types } from "mongoose";

import { Crew, CrewDocument, VehicleDocument, VehicleModel } from "@models";
import { GetByIDOptions, ISearchOptions } from "@typescript/models";
import populateOptions from "@utils/populateOptions";
import ElasticsearchClient from "@elasticsearch/client";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  Vehicle: VehicleModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<VehicleDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const vehicle = await Vehicle.findById(id);

      if (!vehicle && options.throwError) {
        throw new Error("Vehicle.getById: Unable to find vehicle");
      }

      resolve(vehicle);
    } catch (e) {
      reject(e);
    }
  });
};

const search = (
  Vehicle: VehicleModel,
  searchString: string,
  options?: ISearchOptions
) => {
  return new Promise<VehicleDocument[]>(async (resolve, reject) => {
    try {
      const res = await ElasticsearchClient.search({
        index: ElasticSearchIndices.Vehicle,
        body: {
          query: {
            multi_match: {
              query: searchString.toLowerCase(),
              fuzziness: "AUTO",
              fields: [
                "vehicle.name^2",
                "vehicle.vehicleCode^2",
                "vehicle.vehicleType",
              ],
            },
          },
        },
        size: options?.limit,
      });

      let vehicleIds: string[] = res.body.hits.hits.map(
        (item: any) => item._id
      );

      // Filter out blacklisted ids
      if (options?.blacklistedIds) {
        vehicleIds = vehicleIds.filter(
          (id) => !options.blacklistedIds?.includes(id)
        );
      }

      const vehicles: VehicleDocument[] = [];
      for (let i = 0; i < vehicleIds.length; i++) {
        const vehicle = await Vehicle.getById(vehicleIds[i]);
        if (vehicle) vehicles.push(vehicle);
      }

      resolve(vehicles);
    } catch (e) {
      reject(e);
    }
  });
};

const byCode = (Vehicle: VehicleModel, code: string) => {
  return new Promise<VehicleDocument | null>(async (resolve, reject) => {
    try {
      const vehicle = await Vehicle.findOne({
        vehicleCode: { $regex: new RegExp(code, "i") },
      });

      resolve(vehicle);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * ----- Methods -----
 */

const crews = (vehicle: VehicleDocument) => {
  return new Promise<CrewDocument[]>(async (resolve, reject) => {
    try {
      const crews = await Crew.find({ vehicles: vehicle._id });

      resolve(crews);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  search,
  byCode,
  crews,
};
