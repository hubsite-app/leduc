import { MongoMemoryServer } from "mongodb-memory-server";

import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import { MaterialShipment } from "@models";
import {
  IMaterialShipmentCreate,
  IMaterialShipmentCreateV1,
} from "@typescript/materialShipment";

let documents: SeededDatabase, mongoServer: MongoMemoryServer;
const setupDatabase = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      documents = await seedDatabase();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

beforeAll(async () => {
  mongoServer = await prepareDatabase();

  await setupDatabase();
});

afterAll(async () => {
  await disconnectAndStopServer(mongoServer);
});

describe("Material Shipment Class", () => {
  describe("CREATE", () => {
    describe("createDocument", () => {
      describe("success", () => {
        test("should successfully create a new material shipment", async () => {
          const data: IMaterialShipmentCreate = {
            dailyReport: documents.dailyReports.jobsite_2_base_1_1,
            jobsiteMaterial: documents.jobsiteMaterials.jobsite_2_material_1,
            quantity: 100,
            vehicleObject: {
              source: "Burnco",
              vehicleCode: "12",
              vehicleType: "Tandem",
            },
            startTime: new Date("2022-02-25 11:00am"),
            endTime: new Date("2022-02-25 2:00pm"),
          };

          const materialShipment = await MaterialShipment.createDocument(data);

          expect(materialShipment).toBeDefined();
        });
      });

      describe("error", () => {
        test("should error if jobsite material does not belong to jobsite of report", async () => {
          expect.assertions(1);
          const data: IMaterialShipmentCreate = {
            dailyReport: documents.dailyReports.jobsite_2_base_1_1,
            jobsiteMaterial: documents.jobsiteMaterials.jobsite_3_material_1,
            quantity: 100,
            vehicleObject: {
              source: "Burnco",
              vehicleCode: "12",
              vehicleType: "Tandem",
            },
            startTime: new Date("2022-02-25 11:00am"),
            endTime: new Date("2022-02-25 2:00pm"),
          };

          try {
            await MaterialShipment.createDocument(data);
          } catch (e: any) {
            expect(e.message).toBe(
              "this material does not belong to this jobsite"
            );
          }
        });

        test("should error if creating for jobsite version 1", async () => {
          expect.assertions(1);
          const data: IMaterialShipmentCreate = {
            dailyReport: documents.dailyReports.jobsite_1_base_1_1,
            jobsiteMaterial: documents.jobsiteMaterials.jobsite_3_material_1,
            quantity: 100,
            vehicleObject: {
              source: "Burnco",
              vehicleCode: "12",
              vehicleType: "Tandem",
            },
            startTime: new Date("2022-02-25 11:00am"),
            endTime: new Date("2022-02-25 2:00pm"),
          };

          try {
            await MaterialShipment.createDocument(data);
          } catch (e: any) {
            expect(e.message).toBe(
              "cannot create a version >=2 shipment for a version 1 jobsite"
            );
          }
        });
      });
    });

    describe("createDocumentV1", () => {
      describe("success", () => {
        test("should successfully create a version 1 material shipment", async () => {
          const data: IMaterialShipmentCreateV1 = {
            dailyReport: documents.dailyReports.jobsite_1_base_1_1,
            quantity: 100,
            vehicleObject: {
              source: "Burnco",
              vehicleCode: "12",
              vehicleType: "Tandem",
            },
            startTime: new Date("2022-02-25 11:00am"),
            endTime: new Date("2022-02-25 2:00pm"),
            shipmentType: "Material",
            unit: "unit",
            supplier: "Supplier",
          };

          const materialShipment = await MaterialShipment.createDocumentV1(
            data
          );

          expect(materialShipment).toBeDefined();
          expect(materialShipment.schemaVersion).toBe(1);
        });
      });

      describe("error", () => {
        test("should error if creating for a version 2 or greater jobsite", async () => {
          expect.assertions(1);

          const data: IMaterialShipmentCreateV1 = {
            dailyReport: documents.dailyReports.jobsite_2_base_1_1,
            quantity: 100,
            vehicleObject: {
              source: "Burnco",
              vehicleCode: "12",
              vehicleType: "Tandem",
            },
            startTime: new Date("2022-02-25 11:00am"),
            endTime: new Date("2022-02-25 2:00pm"),
            shipmentType: "Material",
            unit: "unit",
            supplier: "Supplier",
          };

          try {
            await MaterialShipment.createDocumentV1(data);
          } catch (e: any) {
            expect(e.message).toBe(
              "cannot create a v1 material shipment if jobsite is not version 1"
            );
          }
        });
      });
    });
  });
});
