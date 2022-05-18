import { JobsiteYearReportDocument, JobsiteYearReportModel } from "@models";
import { IJobsiteReportBuild } from "@typescript/jobsiteReports";
import { GetByIDOptions, Id } from "@typescript/models";
import { ObjectType } from "type-graphql";
import { JobsiteYearReportSchema } from "../schema";
import build from "./build";
import generate from "./generate";
import get from "./get";
import update from "./update";

@ObjectType()
export class JobsiteYearReportClass extends JobsiteYearReportSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: JobsiteYearReportModel,
    id: Id,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public static async getByJobsiteAndDate(
    this: JobsiteYearReportModel,
    jobsiteId: Id,
    date: Date
  ) {
    return get.byJobsiteAndDate(this, jobsiteId, date);
  }

  public static async getByDate(this: JobsiteYearReportModel, date: Date) {
    return get.byDate(this, date);
  }

  public static async getByUpdateRequested(this: JobsiteYearReportModel) {
    return get.byUpdateRequested(this);
  }

  public static async getByUpdatePending(this: JobsiteYearReportModel) {
    return get.byUpdatePending(this);
  }

  public async getDayReports(this: JobsiteYearReportDocument) {
    return get.dayReports(this);
  }

  public async getJobsite(this: JobsiteYearReportDocument) {
    return get.jobsite(this);
  }

  /**
   * ----- Build -----
   */

  public static async requestBuild(
    this: JobsiteYearReportModel,
    data: IJobsiteReportBuild
  ) {
    return build.requestBuild(this, data);
  }

  /**
   * ----- Update -----
   */

  /**
   * @desc generates all reports, should only be used in the worker
   */
  public async updateAndSaveDocument(this: JobsiteYearReportDocument) {
    return update.document(this);
  }

  /**
   * ----- Generate -----
   */

  public async generateExpenseInvoiceReports(this: JobsiteYearReportDocument) {
    return generate.expenseInvoiceReports(this);
  }

  public async generateRevenueInvoiceReports(this: JobsiteYearReportDocument) {
    return generate.revenueInvoiceReports(this);
  }

  public async generateSummary(this: JobsiteYearReportDocument) {
    return generate.summary(this);
  }

  public async generateIssues(this: JobsiteYearReportDocument) {
    return generate.issues(this);
  }

  public async generateExcel(this: JobsiteYearReportDocument) {
    return generate.excel(this);
  }
}
