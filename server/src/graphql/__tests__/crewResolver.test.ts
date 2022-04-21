import request from "supertest";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";
import _ids from "@testing/_ids";
import jestLogin from "@testing/jestLogin";
import { Crew } from "@models";
import { CrewCreateData } from "@graphql/resolvers/crew/mutations";
import { CrewTypes } from "@typescript/crew";

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

describe("Crew Resolver", () => {
  describe("MUTATIONS", () => {
    describe("crewCreate", () => {
      const crewCreate = `
        mutation CrewCreate($data: CrewCreateData!) {
          crewCreate(data: $data) {
            _id
            name
            type
          }
        }
      `;

      describe("success", () => {
        test("should successfully create a new crew", async () => {
          const token = await jestLogin(app, documents.users.admin_user.email);

          const data: CrewCreateData = {
            name: "New Crew",
            //@ts-expect-error
            type: "FormLineSetting",
          };

          const res = await request(app)
            .post("/graphql")
            .send({
              query: crewCreate,
              variables: { data },
            })
            .set("Authorization", token);

          expect(res.status).toBe(200);

          expect(res.body.data.crewCreate).toBeDefined();

          expect(res.body.data.crewCreate.type).toBe(data.type);

          const crew = await Crew.getById(res.body.data.crewCreate._id);

          expect(crew!.name).toBe(data.name);
        });
      });
    });
  });
});
