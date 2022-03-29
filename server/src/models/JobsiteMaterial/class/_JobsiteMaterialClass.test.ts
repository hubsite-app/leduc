import { MongoMemoryServer } from "mongodb-memory-server";

import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import { Jobsite, JobsiteMaterial } from "@models";
import { IJobsiteMaterialCreate } from "@typescript/jobsiteMaterial";

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

describe("Jobsite Material Class", () => {
  describe("GET", () => {
    describe("getCompletedQuantity", () => {
      describe("success", () => {
        test("should successfully get completed quantity", async () => {
          const completed =
            await documents.jobsiteMaterials.jobsite_2_material_1.getCompletedQuantity();

          expect(completed).toBe(
            documents.materialShipments.jobsite_2_base_1_1_shipment_1.quantity
          );
        });
      });
    });
  });

  describe("CREATE", () => {
    describe("createDocument", () => {
      describe("success", () => {
        test("should successfully create new jobsite materials", async () => {
          const data: IJobsiteMaterialCreate = {
            jobsite: documents.jobsites.jobsite_2,
            material: documents.materials.material_1,
            supplier: documents.companies.company_1,
            quantity: 1000,
            rate: 125,
            unit: "tonnes",
          };

          const jobsiteMaterial = await JobsiteMaterial.createDocument(data);

          expect(jobsiteMaterial).toBeDefined();

          expect(
            data.jobsite.materials.includes(jobsiteMaterial._id.toString())
          ).toBeTruthy();
        });
      });
    });
  });
});
