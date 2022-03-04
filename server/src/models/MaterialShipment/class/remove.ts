import { MaterialShipmentDocument } from "@models";

const fullDelete = (materialShipment: MaterialShipmentDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const dailyReport = await materialShipment.getDailyReport();

      if (dailyReport) {
        await dailyReport.removeMaterialShipment(materialShipment);

        await dailyReport.save();
      }

      await materialShipment.remove();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  fullDelete,
};
