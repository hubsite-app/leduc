import {
  Company,
  Crew,
  DailyReport,
  Employee,
  EmployeeWork,
  File,
  Invoice,
  Jobsite,
  JobsiteMaterial,
  Material,
  MaterialShipment,
  Production,
  ReportNote,
  Signup,
  System,
  User,
  Vehicle,
  VehicleWork,
} from "@models";

const clearDatabase = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (process.env.NODE_ENV !== "production") {
        await Company.deleteMany({});
        await Crew.deleteMany({});
        await DailyReport.deleteMany({});
        await Employee.deleteMany({});
        await EmployeeWork.deleteMany({});
        await Invoice.deleteMany({});
        await Jobsite.deleteMany({});
        await JobsiteMaterial.deleteMany({});
        await Material.deleteMany({});
        await MaterialShipment.deleteMany({});
        await Production.deleteMany({});
        await ReportNote.deleteMany({});
        await Signup.deleteMany({});
        await System.deleteMany({});
        await User.deleteMany({});
        await Vehicle.deleteMany({});
        await VehicleWork.deleteMany({});

        await File.removeAll();
      } else {
        throw new Error(
          "clearDatabase: This function cannot be used in production"
        );
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default clearDatabase;
