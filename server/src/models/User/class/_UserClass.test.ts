import { MongoMemoryServer } from "mongodb-memory-server";

import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import { UserRoles } from "@typescript/user";

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

describe("User Class", () => {
  describe("UPDATE", () => {
    describe("updateRole", () => {
      describe("success", () => {
        test("should successfully update user role", async () => {
          const user = documents.users.base_foreman_1_user;

          expect(user.role).toBe(1);

          await user.updateRole(2);

          expect(user.role).toBe(UserRoles.ProjectManager);
        });
      });

      describe("error", () => {
        test("should error if not a valid user role", async () => {
          expect.assertions(1);

          const user = documents.users.base_foreman_1_user;

          try {
            await user.updateRole(15);

            await user.save();
          } catch (e: any) {
            expect(e.message).toMatch(
              "`15` is not a valid enum value for path `role`"
            );
          }
        });
      });
    });
  });
});
