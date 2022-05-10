import { Types } from "mongoose";

import {
  Crew,
  CrewDocument,
  VehicleDocument,
  VehicleModel,
  System,
} from "@models";
import { GetByIDOptions, ISearchOptions } from "@typescript/models";
import populateOptions from "@utils/populateOptions";
import ElasticsearchClient from "@elasticsearch/client";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";
import { IVehicleSearchObject } from "@typescript/vehicle";
import getRateForTime from "@utils/getRateForTime";
import { IHit } from "@typescript/elasticsearch";

/**
 * ----- Static Methods -----
 */

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = async (
  Vehicle: VehicleModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
): Promise<VehicleDocument | null> => {
  options = populateOptions(options, byIdDefaultOptions);

  const vehicle = await Vehicle.findById(id);

  if (!vehicle && options.throwError) {
    throw new Error("Vehicle.getById: Unable to find vehicle");
  }

  return vehicle;
};

const search = async (
  Vehicle: VehicleModel,
  searchString: string,
  options?: ISearchOptions
): Promise<IVehicleSearchObject[]> => {
  const res = await ElasticsearchClient.search({
    index: ElasticSearchIndices.Vehicle,
    body: {
      query: {
        multi_match: {
          query: searchString.toLowerCase(),
          fuzziness: "AUTO",
          fields: ["name", "vehicleCode", "vehicleType"],
        },
      },
    },
    size: options?.limit,
  });

  let vehicleObjects: { id: string; score: number }[] = res.body.hits.hits.map(
    (item: IHit) => {
      return {
        id: item._id,
        score: item._score,
      };
    }
  );

  // Filter out blacklisted ids
  if (options?.blacklistedIds) {
    vehicleObjects = vehicleObjects.filter(
      (object) => !options.blacklistedIds?.includes(object.id)
    );
  }

  const vehicles: IVehicleSearchObject[] = [];
  for (let i = 0; i < vehicleObjects.length; i++) {
    const vehicle = await Vehicle.getById(vehicleObjects[i].id);
    if (vehicle)
      vehicles.push({
        vehicle,
        score: vehicleObjects[i].score,
      });
  }

  return vehicles;
};

const byCode = async (
  Vehicle: VehicleModel,
  code: string
): Promise<VehicleDocument | null> => {
  const vehicle = await Vehicle.findOne({
    vehicleCode: { $regex: new RegExp(code, "i") },
  });

  return vehicle;
};

/**
 * ----- Methods -----
 */

const crews = async (vehicle: VehicleDocument): Promise<CrewDocument[]> => {
  const crews = await Crew.find({ vehicles: vehicle._id, archivedAt: null });

  return crews;
};

const rateForTime = async (
  vehicle: VehicleDocument,
  date: Date
): Promise<number> => {
  if (vehicle.rates && vehicle.rates.length > 0) {
    return getRateForTime(vehicle.rates, date);
  } else {
    const system = await System.getSystem();
    const systemDefault = system.companyVehicleTypeDefaults.find(
      (item) => item.title === vehicle.vehicleType
    );

    if (systemDefault) {
      return getRateForTime(systemDefault.rates, date);
    } else {
      return 0;
    }
  }
};

export default {
  byId,
  search,
  byCode,
  crews,
  rateForTime,
};
