import { DailyReport, EmployeeWork, EmployeeWorkDocument } from "@models";
import { Field, InputType } from "type-graphql";

@InputType()
export class EmployeeWorkJobData {
  @Field(() => String, { nullable: false })
  public jobTitle!: string;

  @Field(() => Date, { nullable: false })
  public startTime!: Date;

  @Field(() => Date, { nullable: true })
  public endTime!: Date;
}

@InputType()
export class EmployeeWorkCreateData {
  @Field(() => [String], { nullable: false })
  public employees!: string[];

  @Field(() => [EmployeeWorkJobData], { nullable: false })
  public jobs!: EmployeeWorkJobData[];
}

@InputType()
export class EmployeeWorkUpdateData {
  @Field({ nullable: false })
  public jobTitle!: string;

  @Field(() => Date, { nullable: false })
  public startTime!: Date;

  @Field(() => Date, { nullable: false })
  public endTime!: Date;
}

const create = (dailyReportId: string, data: EmployeeWorkCreateData[]) => {
  return new Promise<EmployeeWorkDocument[]>(async (resolve, reject) => {
    try {
      const dailyReport = (await DailyReport.getById(dailyReportId, {
        throwError: true,
      }))!;

      const employeeWorks: EmployeeWorkDocument[] = [];

      for (let i = 0; i < data.length; i++) {
        const currentData = data[i];

        for (let j = 0; j < currentData.jobs.length; j++) {
          employeeWorks.push.apply(
            employeeWorks,
            await EmployeeWork.createPerEmployee(
              { ...currentData.jobs[j], dailyReport },
              currentData.employees
            )
          );
        }
      }

      for (let i = 0; i < employeeWorks.length; i++) {
        employeeWorks[i].save();
      }

      await dailyReport.save();

      resolve(employeeWorks);
    } catch (e) {
      reject(e);
    }
  });
};

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

const remove = (id: string) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const employeeWork = (await EmployeeWork.getById(id, {
        throwError: true,
      }))!;

      await employeeWork.fullDelete();

      resolve(employeeWork._id.toString());
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  create,
  update,
  remove,
};
