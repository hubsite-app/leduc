import clearDatabase from "./clearDatabase";

import createCrews, { SeededCrews } from "./documents/crews";
import createDailyReports, {
  SeededDailyReports,
} from "./documents/dailyReports";
import createEmployees, { SeededEmployees } from "./documents/employees";
import createEmployeeWork, {
  SeededEmployeeWork,
} from "./documents/employeeWork";
import createJobsites, { SeededJobsites } from "./documents/jobsites";
import createMaterialShipments, {
  SeededMaterialShipments,
} from "./documents/materialShipments";
import createProductions, { SeededProduction } from "./documents/productions";
import createReportNotes, { SeededReportNotes } from "./documents/reportNotes";
import createUsers, { SeededUsers } from "./documents/users";
import createVehicles, { SeededVehicles } from "./documents/vehicles";
import createVehicleWork, { SeededVehicleWork } from "./documents/vehicleWork";

export interface SeededDatabase {
  crews: SeededCrews;
  dailyReports: SeededDailyReports;
  employees: SeededEmployees;
  employeeWork: SeededEmployeeWork;
  jobsites: SeededJobsites;
  materialShipments: SeededMaterialShipments;
  productions: SeededProduction;
  reportNotes: SeededReportNotes;
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
      const jobsites = await createJobsites();
      const materialShipments = await createMaterialShipments();
      const productions = await createProductions();
      const reportNotes = await createReportNotes();
      const users = await createUsers();
      const vehicles = await createVehicles();
      const vehicleWork = await createVehicleWork();

      resolve({
        crews,
        dailyReports,
        employees,
        employeeWork,
        jobsites,
        materialShipments,
        productions,
        reportNotes,
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
