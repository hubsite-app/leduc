import { VehicleWorkDocument } from "@models";

const requestUpdate = (vehicleWork: VehicleWorkDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const dailyReport = await vehicleWork.getDailyReport();

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
