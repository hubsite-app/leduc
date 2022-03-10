import {
  Crew,
  DailyReport,
  Employee,
  EmployeeWork,
  Jobsite,
  MaterialShipment,
  Production,
  ReportNote,
  Signup,
  User,
  Vehicle,
  VehicleWork,
} from "@models";

const clearDatabase = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (process.env.NODE_ENV !== "production") {
        await Crew.deleteMany({});
        await DailyReport.deleteMany({});
        await Employee.deleteMany({});
        await EmployeeWork.deleteMany({});
        await Jobsite.deleteMany({});
        await MaterialShipment.deleteMany({});
        await Production.deleteMany({});
        await ReportNote.deleteMany({});
        await Signup.deleteMany({});
        await User.deleteMany({});
        await Vehicle.deleteMany({});
        await VehicleWork.deleteMany({});
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
