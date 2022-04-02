import { MaterialShipmentDocument, MaterialShipmentModel } from "@models";
import { IMaterialShipmentCreate } from "@typescript/materialShipment";

const document = (
  MaterialShipment: MaterialShipmentModel,
  data: IMaterialShipmentCreate
) => {
  return new Promise<MaterialShipmentDocument>(async (resolve, reject) => {
    try {
      const materialShipment = new MaterialShipment({
        quantity: data.quantity,
        startTime: data.startTime,
        endTime: data.endTime,
        vehicleObject: data.vehicleObject,
      });

      await materialShipment.updateShipment(data, data.dailyReport);

      await data.dailyReport.addMaterialShipment(materialShipment);

      await materialShipment.validateDocument();

      resolve(materialShipment);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
