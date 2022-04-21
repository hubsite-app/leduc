import ElasticsearchClient from "../../client";
import { VehicleDocument } from "@models";
import { logger } from "@logger";
import { ES_ensureVehicleSettings } from "./settings";
import { ES_ensureVehicleMapping } from "./mapping";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export const ES_ensureVehicleIndex = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await ES_ensureVehicleSettings();
      await ES_ensureVehicleMapping();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const ES_updateVehicle = (vehicle: VehicleDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (process.env.NODE_ENV !== "test") {
        logger.debug(`Updating vehicle ${vehicle._id} in ES`);
        await ElasticsearchClient.update({
          index: ElasticSearchIndices.Vehicle,
          id: vehicle._id.toString(),
          body: {
            doc: {
              name: vehicle.name,
              vehicleCode: vehicle.vehicleCode,
              vehicleType: vehicle.vehicleType,
            },
            doc_as_upsert: true,
          },
        });
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const ES_clearVehicle = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      logger.debug(`Clearing vehicle index in ES`);

      await ElasticsearchClient.indices.delete({
        index: ElasticSearchIndices.Vehicle,
      });

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
