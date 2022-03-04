import { MaterialShipmentDocument } from "@models";
import { IMaterialShipmentUpdate } from "@typescript/materialShipment";
import dayjs from "dayjs";

const document = (
  materialShipment: MaterialShipmentDocument,
  data: IMaterialShipmentUpdate
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      materialShipment.shipmentType = data.shipmentType;

      materialShipment.quantity = data.quantity;

      materialShipment.unit = data.unit;

      materialShipment.startTime = data.startTime;

      materialShipment.endTime = data.endTime;

      materialShipment.supplier = data.supplier;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const date = (materialShipment: MaterialShipmentDocument, date: Date) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const year = dayjs(date).get("year");
      const month = dayjs(date).get("month");
      const day = dayjs(date).get("date");

      if (materialShipment.startTime)
        materialShipment.startTime = dayjs(materialShipment.startTime)
          .set("year", year)
          .set("month", month)
          .set("date", day)
          .toDate();

      if (materialShipment.endTime)
        materialShipment.endTime = dayjs(materialShipment.endTime)
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
