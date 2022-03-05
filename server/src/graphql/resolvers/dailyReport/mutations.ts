import { DailyReport, DailyReportDocument, ReportNote } from "@models";
import { Field, InputType } from "type-graphql";

@InputType()
export class DailyReportUpdateData {
  @Field(() => Date, { nullable: false })
  public date!: Date;
}

@InputType()
export class DailyReportNoteUpdateData {
  @Field(() => String, { nullable: false })
  public note!: string;
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

const updateNote = (id: string, data: DailyReportNoteUpdateData) => {
  return new Promise<DailyReportDocument>(async (resolve, reject) => {
    try {
      const dailyReport = (await DailyReport.getById(id, {
        throwError: true,
      }))!;

      if (dailyReport.reportNote) {
        // Update existing note

        const reportNote = await dailyReport.getReportNote();

        if (!reportNote) {
          throw new Error("unable to find report note");
        }

        await reportNote.updateDocument(data);

        await reportNote.save();
      } else {
        // Create new note

        const reportNote = await ReportNote.createDocument({
          ...data,
          dailyReport,
        });

        await reportNote.save();
      }

      await dailyReport.save();

      resolve(dailyReport);
    } catch (e) {
      reject(e);
    }
  });
};

const updateApproval = (id: string, approved: boolean) => {
  return new Promise<DailyReportDocument>(async (resolve, reject) => {
    try {
      const dailyReport = (await DailyReport.getById(id, {
        throwError: true,
      }))!;

      await dailyReport.updateApproval(approved);

      await dailyReport.save();

      resolve(dailyReport);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  update,
  updateNote,
  updateApproval,
};
