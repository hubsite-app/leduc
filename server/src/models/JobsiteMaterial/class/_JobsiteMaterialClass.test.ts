import { MongoMemoryServer } from "mongodb-memory-server";

import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import { JobsiteMaterial } from "@models";
import { IJobsiteMaterialCreate } from "@typescript/jobsiteMaterial";

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
        test("should successfully create new jobsite materials, not delivered", async () => {
          const data: IJobsiteMaterialCreate = {
            jobsite: documents.jobsites.jobsite_2,
            material: documents.materials.material_1,
            supplier: documents.companies.company_1,
            quantity: 1000,
            rates: [
              {
                date: new Date(),
                rate: 125,
              },
            ],
            unit: "tonnes",
            delivered: false,
            deliveredRates: [],
          };

          const jobsiteMaterial = await JobsiteMaterial.createDocument(data);

          await jobsiteMaterial.save();

          await documents.jobsites.jobsite_2.save();

          expect(jobsiteMaterial).toBeDefined();

          expect(
            data.jobsite.materials.includes(jobsiteMaterial._id.toString())
          ).toBeTruthy();
        });

        test("should successfully create new jobsite materials, delivered", async () => {
          const data: IJobsiteMaterialCreate = {
            jobsite: documents.jobsites.jobsite_2,
            material: documents.materials.material_1,
            supplier: documents.companies.company_1,
            quantity: 1000,
            rates: [],
            unit: "tonnes",
            delivered: true,
            deliveredRates: [
              {
                title: "Tandem",
                rates: [
                  {
                    date: new Date(),
                    rate: 100,
                  },
                ],
              },
            ],
          };

          const jobsiteMaterial = await JobsiteMaterial.createDocument(data);

          await jobsiteMaterial.save();

          await documents.jobsites.jobsite_2.save();

          expect(jobsiteMaterial).toBeDefined();

          expect(
            data.jobsite.materials.includes(jobsiteMaterial._id.toString())
          ).toBeTruthy();
        });
      });

      describe("error", () => {
        test("should error without rates if not delivered", async () => {
          expect.assertions(1);

          const data: IJobsiteMaterialCreate = {
            jobsite: documents.jobsites.jobsite_2,
            material: documents.materials.material_1,
            supplier: documents.companies.company_1,
            quantity: 1000,
            rates: [],
            unit: "tonnes",
            delivered: false,
            deliveredRates: [],
          };

          try {
            await JobsiteMaterial.createDocument(data);
          } catch (e) {
            expect((e as Error).message).toBe("Must provide rates");
          }
        });

        test("should error without delivered rates if necessary", async () => {
          expect.assertions(1);

          const data: IJobsiteMaterialCreate = {
            jobsite: documents.jobsites.jobsite_2,
            material: documents.materials.material_1,
            supplier: documents.companies.company_1,
            quantity: 1000,
            rates: [],
            unit: "tonnes",
            delivered: true,
            deliveredRates: [],
          };

          try {
            await JobsiteMaterial.createDocument(data);
          } catch (e) {
            expect((e as Error).message).toBe("Must provide delivered rates");
          }
        });
      });
    });
  });
});
