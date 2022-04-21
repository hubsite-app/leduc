import { EmployeeWork, EmployeeWorkDocument } from "@models";
import _ids from "@testing/_ids";

export interface SeededEmployeeWork {
  jobsite_1_base_1_1_base_foreman_1: EmployeeWorkDocument;
}

const createEmployeeWork = () => {
  return new Promise<SeededEmployeeWork>(async (resolve, reject) => {
    try {
      const jobsite_1_base_1_1_base_foreman_1 = new EmployeeWork({
        _id: _ids.employeeWork.jobsite_1_base_1_1_base_foreman_1._id,
        startTime: new Date("2022-02-23 8:00 AM"),
        endTime: new Date("2022-02-23 2:00 PM"),
        jobTitle: "Prep work",
        employee: _ids.employees.base_foreman_1._id,
      });

      const jobsite_1_base_1_1_base_foreman_2 = new EmployeeWork({
        _id: _ids.employeeWork.jobsite_1_base_1_1_base_foreman_2._id,
        startTime: new Date("2022-02-23 2:00 AM"),
        endTime: new Date("2022-02-23 6:00 PM"),
        jobTitle: "Finish work",
        employee: _ids.employees.base_foreman_1._id,
      });

      const employeeWork = {
        jobsite_1_base_1_1_base_foreman_1,
        jobsite_1_base_1_1_base_foreman_2,
      };

      for (let i = 0; i < Object.values(employeeWork).length; i++) {
        await Object.values(employeeWork)[i].save();
      }

      resolve(employeeWork);
    } catch (e) {
      reject(e);
    }
  });
};

export default createEmployeeWork;
