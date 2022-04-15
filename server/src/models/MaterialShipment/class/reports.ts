import { MaterialShipmentDocument } from "@models";

const requestUpdate = (materialShipment: MaterialShipmentDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const dailyReport = await materialShipment.getDailyReport();

      await dailyReport?.requestReportUpdate();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  requestUpdate,
};
