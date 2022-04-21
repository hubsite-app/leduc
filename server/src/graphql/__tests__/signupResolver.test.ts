import request from "supertest";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";
import _ids from "@testing/_ids";
import { Signup } from "@models";
import jestLogin from "@testing/jestLogin";

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

describe("Signup Resolver", () => {
  describe("MUTATIONS", () => {
    describe("signupCreate", () => {
      const signupCreate = `
        mutation SignupCreate($employeeId: String!) {
          signupCreate(employeeId: $employeeId) {
            _id 
            employee {
              name
              _id
            }
          }
        }
      `;

      describe("success", () => {
        test("should successfully create a signup for an employee w/ an existing document", async () => {
          const token = await jestLogin(
            app,
            documents.users.base_foreman_1_user.email
          );

          const employeeId = _ids.employees.base_laborer_3._id;

          const res = await request(app)
            .post("/graphql")
            .send({
              query: signupCreate,
              variables: {
                employeeId,
              },
            })
            .set("Authorization", token);

          expect(res.status).toBe(200);

          expect(res.body.data.signupCreate).toBeDefined();

          const signup = res.body.data.signupCreate;

          expect(signup.employee._id).toBe(employeeId.toString());

          const fetchedSignup = await Signup.getById(signup._id);
          expect(fetchedSignup).toBeDefined();
        });
      });
    });
  });
});
