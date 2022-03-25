import { MaterialShipmentDocument, MaterialShipmentModel } from "@models";
import {
  IMaterialShipmentCreate,
  IMaterialShipmentCreateV1,
} from "@typescript/materialShipment";

const document = (
  MaterialShipment: MaterialShipmentModel,
  data: IMaterialShipmentCreate
) => {
  return new Promise<MaterialShipmentDocument>(async (resolve, reject) => {
    try {
      const jobsite = await data.dailyReport.getJobsite();
      if (jobsite.schemaVersion <= 1)
        throw new Error(
          "cannot create a version >=2 shipment for a version 1 jobsite"
        );

      const materialShipment = new MaterialShipment({
        quantity: data.quantity,
        startTime: data.startTime,
        endTime: data.endTime,
        vehicleObject: data.vehicleObject,
      });

      await materialShipment.updateJobsiteMaterial(
        data.jobsiteMaterial,
        data.dailyReport
      );

      await data.dailyReport.addMaterialShipment(materialShipment);

      resolve(materialShipment);
    } catch (e) {
      reject(e);
    }
  });
};

const documentV1 = (
  MaterialShipment: MaterialShipmentModel,
  data: IMaterialShipmentCreateV1
) => {
  return new Promise<MaterialShipmentDocument>(async (resolve, reject) => {
    try {
      const jobsite = await data.dailyReport.getJobsite();
      if (jobsite.schemaVersion !== 1)
        throw new Error(
          "cannot create a v1 material shipment if jobsite is not version 1"
        );

      const materialShipment = new MaterialShipment({
        shipmentType: data.shipmentType,
        quantity: data.quantity,
        unit: data.unit,
        startTime: data.startTime,
        endTime: data.endTime,
        supplier: data.supplier,
        vehicleObject: data.vehicleObject,
        schemaVersion: 1,
      });

      await data.dailyReport.addMaterialShipment(materialShipment);

      resolve(materialShipment);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
  documentV1,
};
