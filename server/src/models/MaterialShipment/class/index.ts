import {
  DailyReportDocument,
  JobsiteMaterialDocument,
  MaterialShipmentDocument,
  MaterialShipmentModel,
} from "@models";
import {
  IMaterialShipmentCreate,
  IMaterialShipmentCreateV1,
  IMaterialShipmentUpdate,
  IMaterialShipmentUpdateV1,
} from "@typescript/materialShipment";
import { GetByIDOptions, Id } from "@typescript/models";
import { ObjectType } from "type-graphql";
import { MaterialShipmentSchema } from "..";
import create from "./create";
import get from "./get";
import remove from "./remove";
import update from "./update";

@ObjectType()
export class MaterialShipmentClass extends MaterialShipmentSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: MaterialShipmentModel,
    id: Id,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public async getVehicle(this: MaterialShipmentDocument) {
    return get.vehicle(this);
  }

  public async getDailyReport(this: MaterialShipmentDocument) {
    return get.dailyReport(this);
  }

  public async getJobsiteMaterial(this: MaterialShipmentDocument) {
    return get.jobsiteMaterial(this);
  }

  /**
   * ----- Create -----
   */

  public static async createDocument(
    this: MaterialShipmentModel,
    data: IMaterialShipmentCreate
  ) {
    return create.document(this, data);
  }

  public static async createDocumentV1(
    this: MaterialShipmentModel,
    data: IMaterialShipmentCreateV1
  ) {
    return create.documentV1(this, data);
  }

  /**
   * ----- Update -----
   */

  public async updateDocument(
    this: MaterialShipmentDocument,
    data: IMaterialShipmentUpdate
  ) {
    return update.document(this, data);
  }

  public async updateDocumentV1(
    this: MaterialShipmentDocument,
    data: IMaterialShipmentUpdateV1
  ) {
    return update.documentV1(this, data);
  }

  public async updateDate(this: MaterialShipmentDocument, date: Date) {
    return update.date(this, date);
  }

  public async updateJobsiteMaterial(
    this: MaterialShipmentDocument,
    jobsiteMaterial: JobsiteMaterialDocument,
    dailyReport: DailyReportDocument
  ) {
    return update.jobsiteMaterial(this, jobsiteMaterial, dailyReport);
  }

  /**
   * ----- Remove -----
   */

  public async fullDelete(this: MaterialShipmentDocument) {
    return remove.fullDelete(this);
  }
}
