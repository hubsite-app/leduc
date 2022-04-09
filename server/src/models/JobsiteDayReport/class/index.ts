import {
  DailyReportDocument,
  JobsiteDayReportDocument,
  JobsiteDayReportModel,
  JobsiteDocument,
} from "@models";
import { ObjectType } from "type-graphql";
import { JobsiteDayReportSchema } from "../schema";
import build from "./build";
import create from "./create";
import generate from "./generate";
import get from "./get";
import update from "./update";

@ObjectType()
export class JobsiteDayReportClass extends JobsiteDayReportSchema {
  /**
   * ----- Get -----
   */

  public static async getByJobsite(
    this: JobsiteDayReportModel,
    jobsite: JobsiteDocument
  ) {
    return get.byJobsite(this, jobsite);
  }

  public async getJobsite(this: JobsiteDayReportDocument) {
    return get.jobsite(this);
  }

  /**
   * ----- Build -----
   */

  public static async buildAllForJobsite(
    this: JobsiteDayReportModel,
    jobsite: JobsiteDocument
  ) {
    return build.allForJobsite(this, jobsite);
  }

  /**
   * ----- Create -----
   */

  public static async createAndSaveDocument(
    this: JobsiteDayReportModel,
    jobsite: JobsiteDocument,
    date: Date
  ) {
    return create.document(this, jobsite, date);
  }

  /**
   * ----- Update -----
   */

  public async updateAndSaveDocument(this: JobsiteDayReportDocument) {
    return update.document(this);
  }

  /**
   * ----- Generate -----
   */

  public async generateReports(this: JobsiteDayReportDocument) {
    return generate.reports(this);
  }

  public async generateEmployeeReports(
    this: JobsiteDayReportDocument,
    dailyReports?: DailyReportDocument[]
  ) {
    return generate.employeeReports(this, dailyReports);
  }

  public async generateVehicleReports(
    this: JobsiteDayReportDocument,
    dailyReports?: DailyReportDocument[]
  ) {
    return generate.vehicleReports(this, dailyReports);
  }

  public async generateMaterialReports(
    this: JobsiteDayReportDocument,
    dailyReports?: DailyReportDocument[]
  ) {
    return generate.materialReports(this, dailyReports);
  }

  public async generateNonCostedMaterialReports(
    this: JobsiteDayReportDocument,
    dailyReports?: DailyReportDocument[]
  ) {
    return generate.nonCostedMaterialReports(this, dailyReports);
  }

  public async generateTruckingReports(
    this: JobsiteDayReportDocument,
    dailyReports?: DailyReportDocument[]
  ) {
    return generate.truckingReports(this, dailyReports);
  }

  public async generateExpenseInvoiceReports(this: JobsiteDayReportDocument) {
    return generate.expenseInvoiceReports(this);
  }

  public async generateRevenueInvoiceReports(this: JobsiteDayReportDocument) {
    return generate.revenueInvoiceReports(this);
  }

  public async generateSummaryReports(this: JobsiteDayReportDocument) {
    return generate.summaryReport(this);
  }
}
