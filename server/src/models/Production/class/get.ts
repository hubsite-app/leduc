import {
  DailyReport,
  DailyReportDocument,
  ProductionDocument,
  ProductionModel,
} from "@models";
import { GetByIDOptions, Id } from "@typescript/models";
import populateOptions from "@utils/populateOptions";

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  Production: ProductionModel,
  id: Id,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<ProductionDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const production = await Production.findById(id);

      if (!production && options.throwError) {
        throw new Error("Production.getById: unable to find production");
      }

      resolve(production);
    } catch (e) {
      reject(e);
    }
  });
};

const dailyReport = (production: ProductionDocument) => {
  return new Promise<DailyReportDocument | null>(async (resolve, reject) => {
    try {
      const dailyReport = await DailyReport.findOne({
        production: production._id,
      });

      resolve(dailyReport);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  dailyReport,
};
