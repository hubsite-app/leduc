import clearDatabase from "./clearDatabase";

import createCrews, { SeededCrews } from "./documents/crews";
import createDailyReports, {
  SeededDailyReports,
} from "./documents/dailyReports";
import createEmployees, { SeededEmployees } from "./documents/employees";
import createEmployeeWork, {
  SeededEmployeeWork,
} from "./documents/employeeWork";
import createFiles, { SeededFiles } from "./documents/files";
import createJobsites, { SeededJobsites } from "./documents/jobsites";
import createMaterials, { SeededMaterials } from "./documents/materials";
import createMaterialShipments, {
  SeededMaterialShipments,
} from "./documents/materialShipments";
import createProductions, { SeededProduction } from "./documents/productions";
import createReportNotes, { SeededReportNotes } from "./documents/reportNotes";
import createSignups, { SeededSignups } from "./documents/signups";
import createUsers, { SeededUsers } from "./documents/users";
import createVehicles, { SeededVehicles } from "./documents/vehicles";
import createVehicleWork, { SeededVehicleWork } from "./documents/vehicleWork";

export interface SeededDatabase {
  crews: SeededCrews;
  dailyReports: SeededDailyReports;
  employees: SeededEmployees;
  employeeWork: SeededEmployeeWork;
  files: SeededFiles;
  jobsites: SeededJobsites;
  materials: SeededMaterials;
  materialShipments: SeededMaterialShipments;
  productions: SeededProduction;
  reportNotes: SeededReportNotes;
  signups: SeededSignups;
  users: SeededUsers;
  vehicles: SeededVehicles;
  vehicleWork: SeededVehicleWork;
}

const seedDatabase = () => {
  return new Promise<SeededDatabase>(async (resolve, reject) => {
    try {
      console.log("Database seeding...");

      // Clear Database
      await clearDatabase();

      // Create documents

      const crews = await createCrews();
      const dailyReports = await createDailyReports();
      const employees = await createEmployees();
      const employeeWork = await createEmployeeWork();
      const files = await createFiles();
      const jobsites = await createJobsites();
      const materials = await createMaterials();
      const materialShipments = await createMaterialShipments();
      const productions = await createProductions();
      const reportNotes = await createReportNotes();
      const signups = await createSignups();
      const users = await createUsers();
      const vehicles = await createVehicles();
      const vehicleWork = await createVehicleWork();

      resolve({
        crews,
        dailyReports,
        employees,
        employeeWork,
        files,
        jobsites,
        materials,
        materialShipments,
        productions,
        reportNotes,
        signups,
        users,
        vehicles,
        vehicleWork,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export default seedDatabase;
