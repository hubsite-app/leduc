import request from "supertest";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";
import _ids from "@testing/_ids";
import jestLogin from "@testing/jestLogin";
import { JobsiteMaterialCreateData } from "@graphql/resolvers/jobsiteMaterial/mutations";
import { Invoice, Jobsite, JobsiteMaterial, System } from "@models";
import { InvoiceData } from "@graphql/resolvers/invoice/mutations";
import { JobsiteCreateData } from "@graphql/resolvers/jobsite/mutations";
import {
  MaterialShipmentCreateData,
  MaterialShipmentShipmentData,
} from "@graphql/resolvers/materialShipment/mutations";

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

describe("Material Shipment Resolver", () => {
  describe("MUTATIONS", () => {
    describe("materialShipmentCreate", () => {
      const materialShipmentCreate = `
        mutation MaterialShipmentCreate($dailyReportId: String!, $data: [MaterialShipmentCreateData!]!) {
          materialShipmentCreate(dailyReportId: $dailyReportId, data: $data) {
            _id
            jobsiteMaterial {
              material {
                _id
                name
              }
            }
            shipmentType
            quantity
            supplier
            unit
            noJobsiteMaterial
          }
        }
      `;

      describe("success", () => {
        test("should successfully create both types of material shipments", async () => {
          const token = await jestLogin(
            app,
            documents.users.base_foreman_1_user.email
          );

          const data: MaterialShipmentCreateData[] = [
            {
              shipments: [
                {
                  noJobsiteMaterial: false,
                  quantity: 100,
                  jobsiteMaterialId:
                    documents.jobsiteMaterials.jobsite_2_material_1._id.toString(),
                },
                {
                  noJobsiteMaterial: true,
                  jobsiteMaterialId: "",
                  quantity: 50,
                  shipmentType: "Shipment Type",
                  supplier: "Burnco",
                  unit: "tonnes",
                },
              ],
              vehicleObject: {
                source: "Bow Mark",
                truckingRateId:
                  documents.jobsites.jobsite_2.truckingRates[0]._id!.toString(),
                vehicleCode: "B-12",
                vehicleType: "Tandem",
              },
            },
          ];

          const res = await request(app)
            .post("/graphql")
            .send({
              query: materialShipmentCreate,
              variables: {
                dailyReportId: documents.dailyReports.jobsite_2_base_1_1._id,
                data,
              },
            })
            .set("Authorization", token);

          expect(res.status).toBe(200);

          expect(res.body.data.materialShipmentCreate.length).toBe(2);
          expect(
            res.body.data.materialShipmentCreate[0].noJobsiteMaterial
          ).toBeFalsy();
          expect(
            res.body.data.materialShipmentCreate[1].noJobsiteMaterial
          ).toBeTruthy();
        });
      });
    });

    describe("materialShipmentUpdate", () => {
      const materialShipmentUpdate = `
        mutation MaterialShipmentUpdate($id: String!, $data: MaterialShipmentShipmentData!) {
          materialShipmentUpdate(id: $id, data: $data) {
            _id
            noJobsiteMaterial
          }
        }
      `;

      describe("success", () => {
        test("should successfully update material shipment w/ jobsite material", async () => {
          const token = await jestLogin(
            app,
            documents.users.base_foreman_1_user.email
          );

          const data: MaterialShipmentShipmentData = {
            noJobsiteMaterial: false,
            jobsiteMaterialId:
              documents.jobsiteMaterials.jobsite_2_material_1._id.toString(),
            quantity: 35,
          };

          const res = await request(app)
            .post("/graphql")
            .send({
              query: materialShipmentUpdate,
              variables: {
                data,
                id: documents.materialShipments.jobsite_2_base_1_1_shipment_1
                  ._id,
              },
            })
            .set("Authorization", token);

          expect(res.status).toBe(200);

          expect(res.body.data.materialShipmentUpdate).toBeDefined();

          expect(res.body.data.materialShipmentUpdate.noJobsiteMaterial).toBe(
            data.noJobsiteMaterial
          );
        });

        test("should successfully update material shipment w/o jobsite material", async () => {
          const token = await jestLogin(
            app,
            documents.users.base_foreman_1_user.email
          );

          const data: MaterialShipmentShipmentData = {
            noJobsiteMaterial: true,
            jobsiteMaterialId: "",
            shipmentType: "Type",
            supplier: "Burnco",
            unit: "unit",
            quantity: 35,
          };

          const res = await request(app)
            .post("/graphql")
            .send({
              query: materialShipmentUpdate,
              variables: {
                data,
                id: documents.materialShipments.jobsite_2_base_1_1_shipment_1
                  ._id,
              },
            })
            .set("Authorization", token);

          expect(res.status).toBe(200);

          expect(res.body.data.materialShipmentUpdate).toBeDefined();

          expect(res.body.data.materialShipmentUpdate.noJobsiteMaterial).toBe(
            data.noJobsiteMaterial
          );
        });
      });
    });
  });
});
