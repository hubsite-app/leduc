import request from "supertest";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";
import _ids from "@testing/_ids";

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

describe("DailyReport Resolver", () => {
  describe("QUERIES", () => {
    describe("dailyReport", () => {
      const dailyReportQuery = `
        query DailyReport($id: String!) {
          dailyReport(id: $id) {
            _id 
            date
            crew {
              name
            }
            jobsite {
              name
            }
            employeeWork {
              startTime
              employee {
                name
              }
            }
            vehicleWork {
              startTime
              vehicle {
                name
              }
            }
            productions {
              jobTitle
            }
            materialShipments {
              shipmentType
              vehicle {
                name
              }
            }
            reportNotes {
              note
            }
          }
        }
      `;

      describe("success", () => {
        test("should fetch and get all requested fields", async () => {
          const res = await request(app)
            .post("/graphql")
            .send({
              query: dailyReportQuery,
              variables: {
                id: _ids.dailyReports.jobsite_1_base_1_1._id,
              },
            });

          expect(res.status).toBe(200);

          expect(res.body.data.dailyReport).toBeDefined();
          const dailyReport = res.body.data.dailyReport;

          expect(dailyReport.crew.name).toBe(documents.crews.base_1.name);
          expect(dailyReport.jobsite.name).toBe(
            documents.jobsites.jobsite_1.name
          );

          expect(dailyReport.employeeWork.length).toBe(
            documents.dailyReports.jobsite_1_base_1_1.employeeWork.length
          );
          expect(dailyReport.employeeWork.length).toBeGreaterThan(0);
          expect(dailyReport.employeeWork[0].employee.name).toBeDefined();

          expect(dailyReport.vehicleWork.length).toBe(
            documents.dailyReports.jobsite_1_base_1_1.vehicleWork.length
          );
          expect(dailyReport.vehicleWork.length).toBeGreaterThan(0);
          expect(dailyReport.vehicleWork[0].vehicle.name).toBe(
            documents.vehicles.skidsteer_1.name
          );

          expect(dailyReport.productions.length).toBe(
            documents.dailyReports.jobsite_1_base_1_1.production.length
          );
          expect(dailyReport.productions.length).toBeGreaterThan(0);

          expect(dailyReport.materialShipments.length).toBe(
            documents.dailyReports.jobsite_1_base_1_1.materialShipment.length
          );
          expect(dailyReport.materialShipments.length).toBeGreaterThan(0);
          expect(dailyReport.materialShipments[0].vehicle.name).toBe(
            documents.vehicles.gravel_truck_1.name
          );

          expect(dailyReport.reportNotes.length).toBe(
            documents.dailyReports.jobsite_1_base_1_1.reportNote.length
          );
          expect(dailyReport.reportNotes.length).toBeGreaterThan(0);
        });
      });
    });
  });
});
