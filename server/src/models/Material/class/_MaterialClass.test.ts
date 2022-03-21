import { MongoMemoryServer } from "mongodb-memory-server";

import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import { Material } from "@models";
import { IMaterialCreate } from "@typescript/material";

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

describe("Crew Class", () => {
  describe("CREATE", () => {
    describe("success", () => {
      test("should successfully create a new unique material", async () => {
        const data: IMaterialCreate = {
          name: "New Unique Material",
        };

        const material = await Material.createDocument(data);

        expect(material).toBeDefined();

        await material.save();
      });
    });

    describe("error", () => {
      test("should error if name is not unique", async () => {
        expect.assertions(1);

        const data: IMaterialCreate = {
          name: documents.materials.material_1.name.toLowerCase(),
        };

        try {
          await Material.createDocument(data);
        } catch (e: any) {
          expect(e.message).toBe("This material already exists");
        }
      });
    });
  });
});
