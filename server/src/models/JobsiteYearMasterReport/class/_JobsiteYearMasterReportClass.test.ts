import { MongoMemoryServer } from "mongodb-memory-server";

import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import { JobsiteYearMasterReport } from "@models";
import dayjs from "dayjs";

let documents: SeededDatabase, mongoServer: MongoMemoryServer;
const setupDatabase = async () => {
  documents = await seedDatabase();

  return;
};

beforeAll(async () => {
  mongoServer = await prepareDatabase();

  await setupDatabase();
});

afterAll(async () => {
  await disconnectAndStopServer(mongoServer);
});

describe("JobsiteYearMasterReport Class", () => {
  describe("GET", () => {
    describe("getExcelMonthNames", () => {
      describe("success", () => {
        it("should return an array of month names", async () => {
          const currentJobsiteYearMasterReport = new JobsiteYearMasterReport({
            startOfYear: dayjs("2022-02-01").startOf("year").toDate(),
          });

          const result1 =
            await currentJobsiteYearMasterReport.getExcelMonthNames();

          expect(result1.length).toBe(dayjs().month() + 1);

          const previousJobsiteYearMasterReport = new JobsiteYearMasterReport({
            startOfYear: dayjs("2021-02-01").startOf("year").toDate(),
          });

          const result2 =
            await previousJobsiteYearMasterReport.getExcelMonthNames();

          expect(result2.length).toBe(12);
        });
      });
    });
  });
});
