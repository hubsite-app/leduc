import { Employee, EmployeeDocument } from "@models";
import _ids from "@testing/_ids";

export interface SeededEmployees {
  base_foreman_1: EmployeeDocument;
  base_operator_1: EmployeeDocument;
  base_laborer_1: EmployeeDocument;
  base_laborer_2: EmployeeDocument;
  base_laborer_3: EmployeeDocument;
}

const createEmployees = () => {
  return new Promise<SeededEmployees>(async (resolve, reject) => {
    try {
      const base_foreman_1 = new Employee({
        _id: _ids.employees.base_foreman_1._id,
        name: "Base Foreman 1",
        jobTitle: "Foreman",
        crews: [_ids.crews.base_1._id],
      });

      const base_operator_1 = new Employee({
        _id: _ids.employees.base_operator_1._id,
        name: "Base Operator 1",
        jobTitle: "Operator",
        crews: [_ids.crews.base_1._id],
      });

      const base_laborer_1 = new Employee({
        _id: _ids.employees.base_laborer_1._id,
        name: "Base Laborer 1",
        jobTitle: "Laborer",
        crews: [_ids.crews.base_1._id],
      });

      const base_laborer_2 = new Employee({
        _id: _ids.employees.base_laborer_2._id,
        name: "Base Laborer 2",
        jobTitle: "Laborer",
        crews: [_ids.crews.base_1._id],
      });

      const base_laborer_3 = new Employee({
        _id: _ids.employees.base_laborer_3._id,
        name: "Base Laborer 3",
        jobTitle: "Laborer",
        crews: [_ids.crews.base_1._id],
      });

      const employees = {
        base_foreman_1,
        base_operator_1,
        base_laborer_1,
        base_laborer_2,
        base_laborer_3,
      };

      for (let i = 0; i < Object.values(employees).length; i++) {
        await Object.values(employees)[i].save();
      }

      resolve(employees);
    } catch (e) {
      reject(e);
    }
  });
};

export default createEmployees;
