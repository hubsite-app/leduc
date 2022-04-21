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
    describe("requestBuildForJobsiteDay", () => {
      describe("success", () => {
        test("should successfully build", async () => {
          const jobsiteDayReport =
            await JobsiteDayReport.requestBuildForJobsiteDay(
              documents.jobsites.jobsite_1,
              documents.dailyReports.jobsite_1_base_1_1.date
            );

          expect(jobsiteDayReport).toBeDefined();
        });
      });
    });
  });
});
