import {
  DailyReportDocument,
  JobsiteMaterialDocument,
  MaterialShipmentDocument,
} from "@models";
import {
  IMaterialShipmentUpdate,
  IMaterialShipmentUpdateV1,
} from "@typescript/materialShipment";
import dayjs from "dayjs";

const document = (
  materialShipment: MaterialShipmentDocument,
  data: IMaterialShipmentUpdate
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      materialShipment.quantity = data.quantity;

      materialShipment.startTime = data.startTime;

      materialShipment.endTime = data.endTime;

      const dailyReport = await materialShipment.getDailyReport();
      if (!dailyReport)
        throw new Error(
          "could not find material shipments daily report for update"
        );
      await materialShipment.updateJobsiteMaterial(
        data.jobsiteMaterial,
        dailyReport
      );

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const documentV1 = (
  materialShipment: MaterialShipmentDocument,
  data: IMaterialShipmentUpdateV1
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

const jobsiteMaterial = (
  materialShipment: MaterialShipmentDocument,
  jobsiteMaterial: JobsiteMaterialDocument,
  dailyReport: DailyReportDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (materialShipment.schemaVersion > 1) {
        const jobsite = await dailyReport.getJobsite();
        if (!jobsite.materials.includes(jobsiteMaterial._id))
          throw new Error("this material does not belong to this jobsite");

        materialShipment.jobsiteMaterial = jobsiteMaterial._id;
      } else
        throw new Error("cannot add jobsite material to v1 material shipment");

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
  documentV1,
  date,
  jobsiteMaterial,
};
