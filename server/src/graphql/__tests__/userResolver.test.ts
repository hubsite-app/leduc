import request from "supertest";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";
import _ids from "@testing/_ids";
import { SignupData } from "@graphql/resolvers/user/mutations";
import { Signup, User } from "@models";

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

  describe("MUTATIONS", () => {
    describe("signup", () => {
      const signupMutation = `
        mutation Signup($signupId: String!, $data: SignupData!) {
          signup(signupId: $signupId, data: $data) {
            _id
            name
            email
            employee {
              _id
            }
          }
        }
      `;

      describe("success", () => {
        test("should successfully signup a new user and remove signup document", async () => {
          const data: SignupData = {
            name: "New User",
            email: "new@user.com",
            password: "testpassword",
          };

          const signupId = _ids.signups.base_laborer_3_signup._id;

          const res = await request(app).post("/graphql").send({
            query: signupMutation,
            variables: {
              signupId,
              data,
            },
          });

          expect(res.status).toBe(200);

          expect(res.body.data.signup).toBeDefined();
          const user = res.body.data.signup;

          expect(user.employee._id).toBe(
            _ids.employees.base_laborer_3._id.toString()
          );

          const fetchedUser = await User.getById(user._id);
          expect(fetchedUser).toBeDefined();

          const passwordMatch = await fetchedUser?.checkPassword(data.password);
          expect(passwordMatch).toBeTruthy();

          const signup = await Signup.getById(signupId);
          expect(signup).toBeNull();
        });

        afterAll(async () => {
          await setupDatabase();
        });
      });

      describe("error", () => {
        test("should error if using a taken email", async () => {
          const data: SignupData = {
            name: "New User",
            email: documents.users.base_foreman_1_user.email,
            password: "testpassword",
          };

          const signupId = _ids.signups.base_laborer_3_signup._id;

          const res = await request(app)
            .post("/graphql")
            .send({
              query: signupMutation,
              variables: {
                signupId,
                data: data,
              },
            });

          expect(res.status).toBe(200);

          expect(res.body.errors.length).toBe(1);
        });
      });
    });
  });
});
