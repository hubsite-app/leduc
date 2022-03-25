import request from "supertest";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";
import _ids from "@testing/_ids";
import jestLogin from "@testing/jestLogin";
import { JobsiteMaterialCreateData } from "@graphql/resolvers/jobsiteMaterial/mutations";
import { Jobsite, JobsiteMaterial } from "@models";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

let mongoServer: any, documents: SeededDatabase, app: any;
function setupDatabase() {
  return new Promise<void>(async (resolve, reject) => {
    try {
      documents = await seedDatabase();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

beforeAll(async (done) => {
  mongoServer = await prepareDatabase();

  app = await createApp();

  await setupDatabase();

  done();
});

afterAll(async (done) => {
  await disconnectAndStopServer(mongoServer);
  done();
});

describe("Jobsite Resolver", () => {
  describe("QUERIES", () => {
    describe("jobsite", () => {
      const jobsiteQuery = `
        query Jobsite($id: String!) {
          jobsite(id: $id) {
            _id 
            name
            crews {
              name
            }
            dailyReports {
              date
            }
          }
        }
      `;

      describe("success", () => {
        test("should fetch and get all requested fields", async () => {
          const res = await request(app)
            .post("/graphql")
            .send({
              query: jobsiteQuery,
              variables: {
                id: _ids.jobsites.jobsite_1._id,
              },
            });

          expect(res.status).toBe(200);

          expect(res.body.data.jobsite).toBeDefined();
          const jobsite = res.body.data.jobsite;

          expect(jobsite.name).toBe(documents.jobsites.jobsite_1.name);

          expect(jobsite.crews.length).toBe(
            documents.jobsites.jobsite_1.crews.length
          );
          expect(jobsite.crews[0].name).toBe(documents.crews.base_1.name);

          expect(jobsite.dailyReports.length).toBeGreaterThan(0);
          expect(new Date(jobsite.dailyReports[0].date).toString()).toBe(
            new Date(documents.dailyReports.jobsite_1_base_1_1.date).toString()
          );
        });
      });
    });
  });

  describe("MUTATIONS", () => {
    describe("jobsiteAddMaterial", () => {
      const jobsiteAddMaterial = `
        mutation JobsiteAddMaterial($jobsiteId: String!, $data: JobsiteMaterialCreateData!) {
          jobsiteAddMaterial(jobsiteId: $jobsiteId, data: $data) {
            _id
            materials {
              _id
              material {
                name
              }
              supplier {
                name
              }
              quantity
              unit
              rate
            }
          }
        }
      `;

      describe("success", () => {
        test("should successfully create a jobsite material", async () => {
          const token = await jestLogin(
            app,
            documents.users.base_foreman_1_user.email
          );

          const data: JobsiteMaterialCreateData = {
            materialId: documents.materials.material_1._id.toString(),
            supplierId: documents.companies.company_1._id.toString(),
            quantity: 1000,
            rate: 75,
            unit: "tonnes",
          };

          const res = await request(app)
            .post("/graphql")
            .send({
              query: jobsiteAddMaterial,
              variables: {
                jobsiteId: documents.jobsites.jobsite_2._id,
                data,
              },
            })
            .set("Authorization", token);

          expect(res.status).toBe(200);

          expect(res.body.data.jobsiteAddMaterial._id).toBe(
            documents.jobsites.jobsite_2._id.toString()
          );

          const jobsite = await Jobsite.getById(
            documents.jobsites.jobsite_2._id
          );

          expect(jobsite?.materials.length).toBe(2);

          const jobsiteMaterial = await JobsiteMaterial.getById(
            jobsite!.materials[1]!.toString()
          );

          expect(jobsiteMaterial!.supplier!.toString()).toBe(data.supplierId);
        });
      });
    });
  });
});
