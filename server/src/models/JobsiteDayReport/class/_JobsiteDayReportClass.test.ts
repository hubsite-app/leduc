import { MongoMemoryServer } from "mongodb-memory-server";

import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import { JobsiteDayReport } from "@models";

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

describe("Jobsite Day Report Class", () => {
  describe("BUILD", () => {
    describe("buildAllForJobsite", () => {
      describe("success", () => {
        test("should successfully build all necessary reports", async () => {
          await JobsiteDayReport.buildAllForJobsite(
            documents.jobsites.jobsite_1
          );

          const dayReports = await documents.jobsites.jobsite_1.getDayReports();

          expect(dayReports.length).toBe(2);

          expect(dayReports[0].dailyReports.length).toBe(1);

          expect(dayReports[1].dailyReports.length).toBe(2);

          const report = dayReports[1];

          expect(report.employees.length).toBe(1);
          expect(report.vehicles.length).toBe(1);
        });
      });
    });
  });
});
