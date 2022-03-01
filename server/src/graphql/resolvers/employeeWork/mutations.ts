import { EmployeeWork, EmployeeWorkDocument } from "@models";
import { Field, InputType } from "type-graphql";

@InputType()
export class EmployeeWorkUpdateData {
  @Field({ nullable: false })
  public jobTitle!: string;

  @Field(() => Date, { nullable: false })
  public startTime!: Date;

  @Field(() => Date, { nullable: false })
  public endTime!: Date;
}

const update = (id: string, data: EmployeeWorkUpdateData) => {
  return new Promise<EmployeeWorkDocument>(async (resolve, reject) => {
    try {
      const employeeWork = (await EmployeeWork.getById(id, {
        throwError: true,
      }))!;

      await employeeWork.updateDocument(data);

      await employeeWork.save();

      resolve(employeeWork);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  update,
};
