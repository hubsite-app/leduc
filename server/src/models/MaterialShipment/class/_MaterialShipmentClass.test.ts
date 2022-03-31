import { MongoMemoryServer } from "mongodb-memory-server";

import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import { MaterialShipment } from "@models";
import { IMaterialShipmentCreate } from "@typescript/materialShipment";
import { Types } from "aws-sdk/clients/acm";

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
              truckingRateId:
                documents.jobsites.jobsite_2.truckingRates[0]._id!.toString(),
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
              truckingRateId:
                documents.jobsites.jobsite_2.truckingRates[0]._id!.toString(),
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
      });
    });
  });
});
