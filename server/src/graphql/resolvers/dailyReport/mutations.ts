import {
  Crew,
  DailyReport,
  DailyReportDocument,
  Employee,
  File,
  Jobsite,
  ReportNote,
  Vehicle,
} from "@models";
import { Id } from "@typescript/models";
import { Field, ID, InputType } from "type-graphql";
import { FileCreateData } from "../file/mutations";

@InputType()
export class DailyReportUpdateData {
  @Field(() => Date, { nullable: false })
  public date!: Date;

  @Field(() => ID, { nullable: false })
  public jobsiteId!: string;
}

@InputType()
export class DailyReportNoteUpdateData {
  @Field(() => String, { nullable: false })
  public note!: string;
}

@InputType()
export class DailyReportCreateData {
  @Field(() => String, { nullable: false })
  public jobsiteId!: string;

  @Field(() => String, { nullable: false })
  public crewId!: string;

  @Field(() => Date, { nullable: false })
  public date!: Date;
}

const create = (data: DailyReportCreateData) => {
  return new Promise<DailyReportDocument>(async (resolve, reject) => {
    try {
      const crew = (await Crew.getById(data.crewId, { throwError: true }))!;
      const jobsite = (await Jobsite.getById(data.jobsiteId, {
        throwError: true,
      }))!;

      const dailyReport = await DailyReport.createDocument({
        crew,
        jobsite,
        date: data.date,
      });

      await dailyReport.save();

      resolve(dailyReport);
    } catch (e) {
      reject(e);
    }
  });
};

const update = (id: string, data: DailyReportUpdateData) => {
  return new Promise<DailyReportDocument>(async (resolve, reject) => {
    try {
      const dailyReport = (await DailyReport.getById(id, {
        throwError: true,
      }))!;

      const { employeeWork, materialShipments } =
        await dailyReport.updateDocument(data);

      await dailyReport.save();

      for (let i = 0; i < employeeWork.length; i++) {
        employeeWork[i].save();
      }

      for (let i = 0; i < materialShipments.length; i++) {
        materialShipments[i].save();
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

const updateJobCostApproval = (id: string, approved: boolean) => {
  return new Promise<DailyReportDocument>(async (resolve, reject) => {
    try {
      const dailyReport = (await DailyReport.getById(id, {
        throwError: true,
      }))!;

      await dailyReport.updateJobCostApproval(approved);

      await dailyReport.save();

      resolve(dailyReport);
    } catch (e) {
      reject(e);
    }
  });
};

const updatePayrollComplete = (id: string, complete: boolean) => {
  return new Promise<DailyReportDocument>(async (resolve, reject) => {
    try {
      const dailyReport = (await DailyReport.getById(id, {
        throwError: true,
      }))!;

      await dailyReport.updatePayrollComplete(complete);

      await dailyReport.save();

      resolve(dailyReport);
    } catch (e) {
      reject(e);
    }
  });
};

const addTemporaryEmployee = (id: string, employeeId: string) => {
  return new Promise<DailyReportDocument>(async (resolve, reject) => {
    try {
      const dailyReport = (await DailyReport.getById(id, {
        throwError: true,
      }))!;

      const employee = (await Employee.getById(employeeId, {
        throwError: true,
      }))!;

      await dailyReport.addTemporaryEmployee(employee);

      await dailyReport.save();

      resolve(dailyReport);
    } catch (e) {
      reject(e);
    }
  });
};

const addTemporaryVehicle = (id: string, vehicleId: string) => {
  return new Promise<DailyReportDocument>(async (resolve, reject) => {
    try {
      const dailyReport = (await DailyReport.getById(id, {
        throwError: true,
      }))!;

      const vehicle = (await Vehicle.getById(vehicleId, {
        throwError: true,
      }))!;

      await dailyReport.addTemporaryVehicle(vehicle);

      await dailyReport.save();

      resolve(dailyReport);
    } catch (e) {
      reject(e);
    }
  });
};

const addNoteFile = (id: Id, data: FileCreateData) => {
  return new Promise<DailyReportDocument>(async (resolve, reject) => {
    try {
      const dailyReport = (await DailyReport.getById(id, {
        throwError: true,
      }))!;

      let reportNote = await dailyReport.getReportNote();
      if (!reportNote) {
        reportNote = await ReportNote.createDocument({
          dailyReport,
          note: "",
        });
      }

      const fileStream = await data.file;

      const file = await File.createDocument({
        description: data.description,
        mimetype: fileStream.mimetype,
        stream: fileStream.createReadStream(),
      });

      await reportNote.addFile(file);

      await reportNote.save();

      await dailyReport.save();

      resolve(dailyReport);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  create,
  update,
  updateNote,
  addNoteFile,
  updateJobCostApproval,
  updatePayrollComplete,
  addTemporaryEmployee,
  addTemporaryVehicle,
};
