import { ProductionDocument } from "@models";

const fullDelete = (production: ProductionDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const dailyReport = await production.getDailyReport();

      if (dailyReport) {
        await dailyReport.removeProduction(production);

        await dailyReport.save();
      }

      await production.remove();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  fullDelete,
};
