import { Types } from "mongoose";

import { Crew, CrewDocument, VehicleDocument, VehicleModel } from "@models";
import { GetByIDOptions } from "@typescript/models";
import populateOptions from "@utils/populateOptions";

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
  crews,
};
