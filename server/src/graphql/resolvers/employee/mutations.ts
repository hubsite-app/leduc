import { Crew, CrewDocument, Employee, EmployeeDocument } from "@models";
import { Id } from "@typescript/models";
import { Field, InputType } from "type-graphql";

@InputType()
export class EmployeeCreateData {
  @Field({ nullable: false })
  public name!: string;

  @Field({ nullable: false })
  public jobTitle!: string;
}

const create = (data: EmployeeCreateData, crewId?: Id) => {
  return new Promise<EmployeeDocument>(async (resolve, reject) => {
    try {
      const employee = await Employee.createDocument(data);

      let crew: CrewDocument | undefined;
      if (crewId) {
        crew = (await Crew.getById(crewId, { throwError: true }))!;

        await crew.addEmployee(employee._id);
      }

      await employee.save();

      if (crew) crew.save();

      resolve(employee);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  create,
};
