import { ProductionDocument, ProductionModel } from "@models";
import { IProductionCreate } from "@typescript/production";

const document = (Production: ProductionModel, data: IProductionCreate) => {
  return new Promise<ProductionDocument>(async (resolve, reject) => {
    try {
      const production = new Production({
        jobTitle: data.jobTitle,
        quantity: data.quantity,
        unit: data.unit,
        startTime: data.startTime,
        endTime: data.endTime,
        description: data.description,
      });

      await data.dailyReport.addProduction(production);

      resolve(production);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
