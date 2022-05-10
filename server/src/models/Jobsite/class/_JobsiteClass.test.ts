import { MongoMemoryServer } from "mongodb-memory-server";

import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import { IJobsiteUpdate } from "@typescript/jobsite";

let documents: SeededDatabase, mongoServer: MongoMemoryServer;
const setupDatabase = async () => {
  documents = await seedDatabase();

  return;
};

beforeAll(async () => {
  mongoServer = await prepareDatabase();

  await setupDatabase();
});

afterAll(async () => {
  await disconnectAndStopServer(mongoServer);
});

describe("Jobsite Class", () => {
  describe("GET", () => {
    describe("getNonCostedMaterialShipments", () => {
      describe("success", () => {
        test("should get all material shipments without costing", async () => {
          const materialShipments =
            await documents.jobsites.jobsite_2.getNonCostedMaterialShipments();

          expect(materialShipments.length).toBe(1);
          expect(materialShipments[0]._id.toString()).toBe(
            documents.materialShipments.jobsite_2_base_1_1_shipment_2._id.toString()
          );
        });
      });
    });
  });

  describe("UPDATE", () => {
    describe("updateDocument", () => {
      describe("success", () => {
        test("should successfully update jobsite", async () => {
          const jobsite = documents.jobsites.jobsite_1;

          const data: IJobsiteUpdate = {
            name: "New Name",
          };
          await jobsite.updateDocument(data);

          expect(jobsite.name).toBe(data.name);
        });
      });
    });
  });
});
