import { MaterialShipmentDocument } from "@models";
import isEmpty from "@utils/isEmpty";

const document = (materialShipment: MaterialShipmentDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (materialShipment.noJobsiteMaterial) {
        if (isEmpty(materialShipment.shipmentType))
          throw new Error("This material shipment must have a shipment type");

        if (isEmpty(materialShipment.unit))
          throw new Error("This material shipment must have a unit");

        if (isEmpty(materialShipment.supplier))
          throw new Error("This material shipment must have a supplier");
      } else {
        if (isEmpty(materialShipment.jobsiteMaterial))
          throw new Error(
            "This material shipment must have a jobsite material"
          );
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
