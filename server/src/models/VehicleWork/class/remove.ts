import { VehicleWorkDocument } from "@models";

const fullDelete = (vehicleWork: VehicleWorkDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const dailyReport = await vehicleWork.getDailyReport();

      if (dailyReport) {
        await dailyReport.removeVehicleWork(vehicleWork);

        await dailyReport.save();
      }

      await vehicleWork.remove();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  fullDelete,
};
