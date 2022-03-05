import { MaterialShipment } from "@models";
import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const updateToV1 = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const materialShipments = await MaterialShipment.find({
        schemaVersion: undefined,
      });

      if (materialShipments.length > 0) {
        console.log(
          `Updating ${materialShipments.length} MaterialShipment document(s) to Schema Version 1...`
        );

        for (let i = 0; i < materialShipments.length; i++) {
          const materialShipment = materialShipments[i];

          if (materialShipment.startTime) {
            const offset = dayjs(materialShipment.startTime)
              .tz("America/Edmonton")
              .utcOffset();
            materialShipment.startTime = dayjs(materialShipment.startTime)
              .add(Math.abs(offset), "minutes")
              .toDate();
          } else {
            materialShipment.startTime = new Date();
          }

          if (materialShipment.endTime) {
            const offset = dayjs(materialShipment.endTime)
              .tz("America/Edmonton")
              .utcOffset();
            materialShipment.endTime = dayjs(materialShipment.endTime)
              .add(Math.abs(offset), "minutes")
              .toDate();
          } else {
            materialShipment.endTime = new Date();
          }

          if (!materialShipment.quantity) materialShipment.quantity = 0;

          if (!materialShipment.unit) materialShipment.unit = "placeholder";

          materialShipment.schemaVersion = 1;

          await materialShipment.save();
        }

        console.log(
          `...successfully updated ${materialShipments.length} MaterialShipment document(s) to Schema Version 1.`
        );
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const updateMaterialShipment = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await updateToV1();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default updateMaterialShipment;
