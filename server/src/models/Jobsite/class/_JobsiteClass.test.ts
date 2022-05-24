import { MongoMemoryServer } from "mongodb-memory-server";

import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import { IJobsiteUpdate } from "@typescript/jobsite";
import { File, Jobsite, System } from "@models";
import dayjs from "dayjs";
import { UserRoles } from "@typescript/user";
import fs from "fs";
import path from "path";

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

describe("Jobsite Class", () => {
  describe("GET", () => {
    describe("getNonCostedMaterialShipments", () => {
      describe("success", () => {
        test("should get all material shipments without costing", async () => {
          const materialShipments =
            await documents.jobsites.jobsite_2.getNonCostedMaterialShipments();

          expect(materialShipments.length).toBe(1);
          expect(materialShipments[0]._id.toString()).toBe(
            documents.materialShipments.jobsite_2_base_1_1_shipment_2._id.toString()
          );
        });
      });
    });
  });

  describe("UPDATE", () => {
    describe("updateDocument", () => {
      describe("success", () => {
        test("should successfully update jobsite", async () => {
          const jobsite = documents.jobsites.jobsite_1;

          const data: IJobsiteUpdate = {
            name: "New Name",
          };
          await jobsite.updateDocument(data);

          expect(jobsite.name).toBe(data.name);
        });
      });
    });

    describe("setAllEmptyTruckingRates", () => {
      afterAll(async () => {
        await setupDatabase();
      });

      describe("success", () => {
        test("should successfully update all empty trucking rates", async () => {
          expect(documents.jobsites.jobsite_1.truckingRates.length).toBe(0);
          expect(documents.jobsites.jobsite_3.truckingRates.length).toBe(0);

          const jobsites = await Jobsite.setAllEmptyTruckingRates();

          expect(jobsites.length).toBe(2);

          await jobsites[0].save();
          await jobsites[1].save();

          const system = await System.getSystem();
          expect(jobsites[0].truckingRates.length).toBe(
            system.materialShipmentVehicleTypeDefaults.length
          );
          expect(jobsites[1].truckingRates.length).toBe(
            system.materialShipmentVehicleTypeDefaults.length
          );

          const anotherAttempt = await Jobsite.setAllEmptyTruckingRates();
          expect(anotherAttempt.length).toBe(0);
        });
      });
    });

    describe("addTruckingRateToAll", () => {
      describe("success", () => {
        afterEach(async () => {
          await setupDatabase();
        });

        test("should successfully add trucking rate to all", async () => {
          const newRate = {
            date: dayjs().add(1, "year").toDate(),
            rate: 145,
          };

          const system = await System.getSystem();
          system.materialShipmentVehicleTypeDefaults[0].rates.push(newRate);
          await system.save();

          expect(
            documents.jobsites.jobsite_2.truckingRates[0].rates.length
          ).toBe(1);

          const jobsites = await Jobsite.addTruckingRateToAll(0, 1);

          expect(jobsites.length).toBe(1);

          expect(jobsites[0]._id.toString()).toBe(
            documents.jobsites.jobsite_2._id.toString()
          );

          expect(jobsites[0].truckingRates[0].rates.length).toBe(2);
          expect(jobsites[0].truckingRates[0].rates[1]).toMatchObject(newRate);
        });

        test("should not add trucking rate if requested rate is before the already assigned jobsite rate", async () => {
          const newRate = {
            date: new Date(),
            rate: 145,
          };

          const system = await System.getSystem();
          system.materialShipmentVehicleTypeDefaults[0].rates.push(newRate);
          await system.save();

          expect(
            documents.jobsites.jobsite_2.truckingRates[0].rates.length
          ).toBe(1);

          expect(
            system.materialShipmentVehicleTypeDefaults[0].rates.length
          ).toBe(2);

          const jobsites = await Jobsite.addTruckingRateToAll(0, 1);

          expect(jobsites.length).toBe(0);
        });

        test("should add new rate item to all jobsites", async () => {
          const newRateItem = {
            title: "New",
            rates: [
              {
                date: new Date(),
                rate: 40,
              },
            ],
          };

          const system = await System.getSystem();
          system.materialShipmentVehicleTypeDefaults.push(newRateItem);
          await system.save();

          expect(documents.jobsites.jobsite_2.truckingRates.length).toBe(1);

          const jobsites = await Jobsite.addTruckingRateToAll(
            system.materialShipmentVehicleTypeDefaults.length - 1,
            0
          );

          expect(jobsites.length).toBe(1);

          expect(jobsites[0]._id.toString()).toBe(
            documents.jobsites.jobsite_2._id.toString()
          );

          expect(jobsites[0].truckingRates.length).toBe(2);

          expect(jobsites[0].truckingRates[1].title).toBe(newRateItem.title);
          expect(jobsites[0].truckingRates[1].rates.length).toBe(
            newRateItem.rates.length
          );
        });
      });
    });

    describe("addFileObject", () => {
      describe("success", () => {
        afterEach(async () => {
          await setupDatabase();
        });

        test("should successfully add a file object", async () => {
          const jobsite = documents.jobsites.jobsite_1;
          expect(jobsite.fileObjects.length).toBe(1);

          const file = await jobsite.addFileObject({
            file: {
              mimetype: "image/jpeg",
              stream: fs.createReadStream(
                path.join(
                  __dirname,
                  "..",
                  "..",
                  "..",
                  "testing",
                  "assets",
                  "concrete.jpg"
                )
              ),
              description: "description",
            },
            minRole: UserRoles.User,
          });

          expect(file.description).toBe("description");

          await jobsite.save();

          expect(jobsite.fileObjects.length).toBe(2);
        });
      });
    });
  });

  describe("REMOVE", () => {
    describe("removeFileObject", () => {
      describe("success", () => {
        test("should successfully remove file object", async () => {
          const jobsite = documents.jobsites.jobsite_1;

          expect(jobsite.fileObjects.length).toBe(1);

          const fileObject = JSON.parse(JSON.stringify(jobsite.fileObjects[0]));

          const foundFile = await File.getById(fileObject.file || "");
          expect(foundFile).toBeDefined();

          await jobsite.removeFileObject(fileObject._id || "");

          expect(jobsite.fileObjects.length).toBe(0);

          const notFound = await File.getById(fileObject.file || "");
          expect(notFound).toBeNull();
        });
      });
    });
  });
});
