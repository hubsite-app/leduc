import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import { DailyReportDocument, DailyReportModel } from "@models";
import { DailyReportSchema } from "../schema";
import get from "./get";
import { GetByIDOptions, IListOptions } from "@typescript/models";
import { IDailyReportUpdate } from "@typescript/dailyReport";
import update from "./update";

@ObjectType()
export class DailyReportClass extends DailyReportSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: DailyReportModel,
    id: Types.ObjectId | string,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public static async getList(
    this: DailyReportModel,
    options?: IListOptions<DailyReportDocument>
  ) {
    return get.list(this, options);
  }

  public async getJobsite(this: DailyReportDocument) {
    return get.jobsite(this);
  }

  public async getCrew(this: DailyReportDocument) {
    return get.crew(this);
  }

  public async getEmployeeWork(this: DailyReportDocument) {
    return get.employeeWork(this);
  }

  public async getVehicleWork(this: DailyReportDocument) {
    return get.vehicleWork(this);
  }

  public async getProduction(this: DailyReportDocument) {
    return get.production(this);
  }

  public async getMaterialShipments(this: DailyReportDocument) {
    return get.materialShipments(this);
  }

  public async getReportNotes(this: DailyReportDocument) {
    return get.reportNotes(this);
  }

  /**
   * ----- Update -----
   */

  public async updateDocument(
    this: DailyReportDocument,
    data: IDailyReportUpdate
  ) {
    return update.document(this, data);
  }
}
