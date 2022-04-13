import { JobsiteMonthReportDocument, JobsiteMonthReportModel } from "@models";
import { IJobsiteMonthReportBuild } from "@typescript/jobsiteMonthReport";
import { GetByIDOptions, Id } from "@typescript/models";
import { ObjectType } from "type-graphql";
import { JobsiteMonthReportSchema } from "../schema";
import build from "./build";
import get from "./get";

@ObjectType()
export class JobsiteMonthReportClass extends JobsiteMonthReportSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: JobsiteMonthReportModel,
    id: Id,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public static async getByJobsiteAndDate(
    this: JobsiteMonthReportModel,
    jobsiteId: Id,
    date: Date
  ) {
    return get.byJobsiteAndDate(this, jobsiteId, date);
  }

  public async getDayReports(this: JobsiteMonthReportDocument) {
    return get.dayReports(this);
  }

  public async getJobsite(this: JobsiteMonthReportDocument) {
    return get.jobsite(this);
  }

  /**
   * ----- Build -----
   */

  public static async buildDocumentAndSave(
    this: JobsiteMonthReportModel,
    data: IJobsiteMonthReportBuild
  ) {
    return build.documentAndSave(this, data);
  }
}
