import { MaterialShipment } from "@models";
import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const updateToV1 = async () => {
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
};

const updateToV2 = async () => {
  const materialShipments = await MaterialShipment.find({
    schemaVersion: 1,
  });

  if (materialShipments.length > 0) {
    console.log(
      `Updating ${materialShipments.length} MaterialShipment document(s) to Schema Version 2...`
    );

    for (let i = 0; i < materialShipments.length; i++) {
      const materialShipment = materialShipments[i];

      if (!materialShipment.jobsiteMaterial) {
        materialShipment.noJobsiteMaterial = true;
      }

      materialShipment.schemaVersion = 2;

      await materialShipment.save();
    }

    console.log(
      `...successfully updated ${materialShipments.length} MaterialShipment document(s) to Schema Version 2.`
    );
  }

  return;
};

const updateMaterialShipment = async () => {
  await updateToV1();

  await updateToV2();

  return;
};

export default updateMaterialShipment;
