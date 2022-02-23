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

describe("User Resolver", () => {
  describe("QUERIES", () => {
    describe("user", () => {
      const userQuery = `
        query User($id: String!) {
          user(id: $id) {
            _id 
            name
            email
            password
            employee {
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
              query: userQuery,
              variables: {
                id: _ids.users.base_foreman_1_user._id,
              },
            });

          expect(res.status).toBe(200);

          expect(res.body.data.user).toBeDefined();
          const user = res.body.data.user;

          expect(user.name).toBe(documents.users.base_foreman_1_user.name);

          expect(user.employee.name).toBe(
            documents.employees.base_foreman_1.name
          );
        });
      });
    });
  });
});
