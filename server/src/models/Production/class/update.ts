import { ProductionDocument } from "@models";
import { IProductionUpdate } from "@typescript/production";
import dayjs from "dayjs";

const document = (production: ProductionDocument, data: IProductionUpdate) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      production.jobTitle = data.jobTitle;

      production.quantity = data.quantity;

      production.unit = data.unit;

      production.startTime = data.startTime;

      production.endTime = data.endTime;

      production.description = data.description;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const date = (production: ProductionDocument, date: Date) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const year = dayjs(date).get("year");
      const month = dayjs(date).get("month");
      const day = dayjs(date).get("date");

      production.startTime = dayjs(production.startTime)
        .set("year", year)
        .set("month", month)
        .set("date", day)
        .toDate();
      production.endTime = dayjs(production.endTime)
        .set("year", year)
        .set("month", month)
        .set("date", day)
        .toDate();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
  date,
};
