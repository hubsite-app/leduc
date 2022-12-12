import ElasticsearchClient from "../../client";
import { VehicleDocument } from "@models";
import { logger } from "@logger";
import { ES_ensureVehicleSettings } from "./settings";
import { ES_ensureVehicleMapping } from "./mapping";
import ElasticSearchIndices from "@constants/ElasticSearchIndices";

export const ES_ensureVehicleIndex = async () => {
  await ES_ensureVehicleSettings();
  await ES_ensureVehicleMapping();

  return;
};

export const ES_updateVehicle = async (vehicle: VehicleDocument) => {
  if (process.env.NODE_ENV !== "test") {
    logger.debug(`Updating vehicle ${vehicle._id} in ES`);

    if (!vehicle.archivedAt) {
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
    } else {
      ElasticsearchClient.get({
        id: vehicle._id.toString(),
        index: ElasticSearchIndices.Vehicle,
      })
        .then(async () => {
          await ElasticsearchClient.delete({
            id: vehicle._id.toString(),
            index: ElasticSearchIndices.Vehicle,
          });
        })
        .catch(() => {
          return;
        });
    }
  }

  return;
};

export const ES_clearVehicle = async () => {
  logger.debug("Clearing vehicle index in ES");

  await ElasticsearchClient.indices.delete({
    index: ElasticSearchIndices.Vehicle,
  });

  return;
};
