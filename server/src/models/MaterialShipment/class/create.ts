import { MaterialShipmentDocument, MaterialShipmentModel } from "@models";
import { IMaterialShipmentCreate } from "@typescript/materialShipment";

const document = (
  MaterialShipment: MaterialShipmentModel,
  data: IMaterialShipmentCreate
) => {
  return new Promise<MaterialShipmentDocument>(async (resolve, reject) => {
    try {
      const materialShipment = new MaterialShipment({
        shipmentType: data.shipmentType,
        quantity: data.quantity,
        unit: data.unit,
        startTime: data.startTime,
        endTime: data.endTime,
        supplier: data.supplier,
        vehicleObject: data.vehicleObject,
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
};
