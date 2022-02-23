import request from "supertest";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";
import _ids from "@testing/_ids";

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

describe("Vehicle Resolver", () => {
  describe("QUERIES", () => {
    describe("vehicle", () => {
      const vehicleQuery = `
        query Vehicle($id: String!) {
          vehicle(id: $id) {
            _id 
            name
            crews {
              name
            }
          }
        }
      `;

      describe("success", () => {
        test("should fetch and get all requested fields", async () => {
          const res = await request(app)
            .post("/graphql")
            .send({
              query: vehicleQuery,
              variables: {
                id: _ids.vehicles.skidsteer_1._id,
              },
            });

          expect(res.status).toBe(200);

          expect(res.body.data.vehicle).toBeDefined();
          const vehicle = res.body.data.vehicle;

          expect(vehicle.name).toBe(documents.vehicles.skidsteer_1.name);

          expect(vehicle.crews.length).toBeGreaterThan(0);
          expect(vehicle.crews[0].name).toBe(documents.crews.base_1.name);
        });
      });
    });
  });
});
