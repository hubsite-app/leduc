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

describe("Employee Resolver", () => {
  describe("QUERIES", () => {
    describe("employee", () => {
      const employeeQuery = `
        query Employee($id: String!) {
          employee(id: $id) {
            _id 
            name
            jobTitle
            user {
              name
            }
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
              query: employeeQuery,
              variables: {
                id: _ids.employees.base_foreman_1._id,
              },
            });

          expect(res.status).toBe(200);

          expect(res.body.data.employee).toBeDefined();
          const employee = res.body.data.employee;

          expect(employee.name).toBe(documents.employees.base_foreman_1.name);

          expect(employee.user.name).toBe(
            documents.users.base_foreman_1_user.name
          );

          expect(employee.crews.length).toBe(1);
          expect(employee.crews[0].name).toBe(documents.crews.base_1.name);
        });
      });
    });
  });
});
