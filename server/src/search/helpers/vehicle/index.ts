import { VehicleDocument } from "@models";
import SearchClient from "search/client";
import SearchIndices from "@constants/SearchIndices";

export interface VehicleSearchDocument {
  id: string;
  name: string;
  vehicleCode: string;
  vehicleType: string;
}

export const VehicleSearchIndex = SearchClient.index<VehicleSearchDocument>(
  SearchIndices.Vehicle
);
VehicleSearchIndex.primaryKey = "id";

export const search_UpdateVehicle = async (vehicle: VehicleDocument) => {
  if (process.env.NODE_ENV === "test") return;

  if (!vehicle.archivedAt) {
    await VehicleSearchIndex.addDocuments([
      {
        id: vehicle._id.toString(),
        name: vehicle.name,
        vehicleCode: vehicle.vehicleCode,
        vehicleType: vehicle.vehicleType,
      },
    ]);
  } else {
    await VehicleSearchIndex.deleteDocument(vehicle._id.toString());
  }
};
