import {
  DailyReport,
  DailyReportDocument,
  MaterialShipmentDocument,
  MaterialShipmentModel,
  Vehicle,
  VehicleDocument,
} from "@models";
import { GetByIDOptions, Id } from "@typescript/models";
import populateOptions from "@utils/populateOptions";

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  MaterialShipment: MaterialShipmentModel,
  id: Id,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<MaterialShipmentDocument | null>(
    async (resolve, reject) => {
      try {
        options = populateOptions(options, byIdDefaultOptions);

        const materialShipment = await MaterialShipment.findById(id);

        if (!materialShipment && options.throwError) {
          throw new Error(
            "MaterialShipment.getById: unable to find material shipment"
          );
        }

        resolve(materialShipment);
      } catch (e) {
        reject(e);
      }
    }
  );
};

const vehicle = (materialShipment: MaterialShipmentDocument) => {
  return new Promise<VehicleDocument | null>(async (resolve, reject) => {
    try {
      const vehicle = await Vehicle.getById(materialShipment.vehicle || "");

      resolve(vehicle);
    } catch (e) {
      reject(e);
    }
  });
};

const dailyReport = (materialShipment: MaterialShipmentDocument) => {
  return new Promise<DailyReportDocument | null>(async (resolve, reject) => {
    try {
      const dailyReport = await DailyReport.findOne({
        materialShipment: materialShipment._id,
      });

      resolve(dailyReport);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  vehicle,
  dailyReport,
};
