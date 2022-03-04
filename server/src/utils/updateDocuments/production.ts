import { Production } from "@models";
import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const updateToV1 = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const productions = await Production.find({
        schemaVersion: undefined,
      });

      if (productions.length > 0) {
        console.log(
          `Updating ${productions.length} Production document(s) to Schema Version 1...`
        );

        for (let i = 0; i < productions.length; i++) {
          const production = productions[i];

          if (production.startTime) {
            const offset = dayjs(production.startTime)
              .tz("America/Edmonton")
              .utcOffset();
            production.startTime = dayjs(production.startTime)
              .add(Math.abs(offset), "minutes")
              .toDate();
          } else {
            production.startTime = new Date();
          }

          if (production.endTime) {
            const offset = dayjs(production.endTime)
              .tz("America/Edmonton")
              .utcOffset();
            production.endTime = dayjs(production.endTime)
              .add(Math.abs(offset), "minutes")
              .toDate();
          } else {
            production.endTime = new Date();
          }

          production.schemaVersion = 1;

          await production.save();
        }

        console.log(
          `...successfully updated ${productions.length} Production document(s) to Schema Version 1.`
        );
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduction = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await updateToV1();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default updateProduction;
