import { DailyReport, DailyReportDocument } from "@models";
import { Field, InputType } from "type-graphql";

@InputType()
export class DailyReportUpdateData {
  @Field(() => Date, { nullable: false })
  public date!: Date;
}

const update = (id: string, data: DailyReportUpdateData) => {
  return new Promise<DailyReportDocument>(async (resolve, reject) => {
    try {
      const dailyReport = (await DailyReport.getById(id, {
        throwError: true,
      }))!;

      const { employeeWork } = await dailyReport.updateDocument(data);

      await dailyReport.save();

      for (let i = 0; i < employeeWork.length; i++) {
        employeeWork[i].save();
      }

      resolve(dailyReport!);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  update,
};
