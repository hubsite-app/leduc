import { MongoMemoryServer } from "mongodb-memory-server";

import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import { Crew, EmployeeWork } from "@models";
import dayjs from "dayjs";

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

describe("Daily Report Class", () => {
  describe("updateDocument", () => {
    describe("success", () => {
      test("should successfully update date and all relevant dates", async () => {
        const dailyReport = documents.dailyReports.jobsite_1_base_1_1;

        const newDate = new Date("2022-03-02");

        const { employeeWork } = await dailyReport.updateDocument({
          date: newDate,
        });

        expect(dailyReport.date).toEqual(newDate);

        // ensure it was different before
        const employeeWorkBefore = (await EmployeeWork.getById(
          employeeWork[0]._id
        ))!;
        expect(dayjs(employeeWorkBefore.startTime).diff(newDate, "days")).toBe(
          -6
        );
        expect(dayjs(employeeWorkBefore.endTime).diff(newDate, "days")).toBe(
          -6
        );

        // ensure it matches now
        expect(dayjs(employeeWork[0].startTime).diff(newDate, "days")).toBe(0);
        expect(dayjs(employeeWork[0].endTime).diff(newDate, "days")).toBe(0);
      });
    });
  });
});
