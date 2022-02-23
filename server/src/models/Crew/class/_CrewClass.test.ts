import { MongoMemoryServer } from "mongodb-memory-server";

import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import { Crew } from "@models";

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
  describe("GET", () => {
    describe("getEmployees", () => {
      describe("success", () => {
        test("should get array of all employees", async () => {
          const employees = await documents.crews.base_1.getEmployees();

          expect(employees.length).toBe(5);
        });
      });
    });

    describe("getVehicles", () => {
      describe("success", () => {
        test("should get array of all vehicles", async () => {
          const vehicles = await documents.crews.base_1.getVehicles();

          expect(vehicles.length).toBe(3);
        });
      });
    });

    describe("getJobsites", () => {
      describe("success", () => {
        test("should get array of all jobsites", async () => {
          const jobsites = await documents.crews.base_1.getJobsites();

          expect(jobsites.length).toBe(1);
        });
      });
    });

    describe("getByVehicle", () => {
      describe("success", () => {
        test("should get crews that contain this vehicle", async () => {
          const crews = await Crew.getByVehicle(
            documents.vehicles.gravel_truck_1
          );

          expect(crews.length).toBe(1);
        });
      });
    });
  });
});
