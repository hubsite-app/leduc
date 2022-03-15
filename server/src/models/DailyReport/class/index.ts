import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import {
  DailyReportDocument,
  DailyReportModel,
  EmployeeDocument,
  EmployeeWorkDocument,
  MaterialShipmentDocument,
  ProductionDocument,
  ReportNoteDocument,
  VehicleDocument,
  VehicleWorkDocument,
} from "@models";
import { DailyReportSchema } from "../schema";
import get from "./get";
import {
  GetByIDOptions,
  Id,
  IListOptions,
  ISearchOptions,
} from "@typescript/models";
import {
  IDailyReportCreate,
  IDailyReportUpdate,
} from "@typescript/dailyReport";
import update from "./update";
import remove from "./remove";
import create from "./create";

@ObjectType()
export class DailyReportClass extends DailyReportSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: DailyReportModel,
    id: Id,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public static async search(
    this: DailyReportModel,
    searchString: string,
    options?: ISearchOptions
  ) {
    return get.search(this, searchString, options);
  }

  public static async getList(
    this: DailyReportModel,
    options?: IListOptions<DailyReportDocument>
  ) {
    return get.list(this, options);
  }

  public static async getExistingReport(
    this: DailyReportModel,
    jobsiteId: Id,
    crewId: Id,
    date: Date
  ) {
    return get.existingReport(this, jobsiteId, crewId, date);
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

  public async getReportNote(this: DailyReportDocument) {
    return get.reportNote(this);
  }

  public async getTemporaryEmployees(this: DailyReportDocument) {
    return get.temporaryEmployees(this);
  }

  public async getTemporaryVehicles(this: DailyReportDocument) {
    return get.temporaryVehicles(this);
  }

  /**
   * ----- Create -----
   */

  public static async createDocument(
    this: DailyReportModel,
    data: IDailyReportCreate
  ) {
    return create.document(this, data);
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

  public async updateDate(this: DailyReportDocument, date: Date) {
    return update.date(this, date);
  }

  public async updateApproval(this: DailyReportDocument, approved: boolean) {
    return update.approval(this, approved);
  }

  public async addEmployeeWork(
    this: DailyReportDocument,
    employeeWork: EmployeeWorkDocument
  ) {
    return update.addEmployeeWork(this, employeeWork);
  }

  public async addVehicleWork(
    this: DailyReportDocument,
    vehicleWork: VehicleWorkDocument
  ) {
    return update.addVehicleWork(this, vehicleWork);
  }

  public async addProduction(
    this: DailyReportDocument,
    production: ProductionDocument
  ) {
    return update.addProduction(this, production);
  }

  public async addMaterialShipment(
    this: DailyReportDocument,
    materialShipment: MaterialShipmentDocument
  ) {
    return update.addMaterialShipment(this, materialShipment);
  }

  public async setReportNote(
    this: DailyReportDocument,
    reportNote: ReportNoteDocument
  ) {
    return update.setReportNote(this, reportNote);
  }

  public async addTemporaryEmployee(
    this: DailyReportDocument,
    employee: EmployeeDocument
  ) {
    return update.addTemporaryEmployee(this, employee);
  }

  public async addTemporaryVehicle(
    this: DailyReportDocument,
    vehicle: VehicleDocument
  ) {
    return update.addTemporaryVehicle(this, vehicle);
  }

  /**
   * ----- Remove -----
   */

  public async removeEmployeeWork(
    this: DailyReportDocument,
    employeeWork: EmployeeWorkDocument
  ) {
    return remove.employeeWork(this, employeeWork);
  }

  public async removeVehicleWork(
    this: DailyReportDocument,
    vehicleWork: VehicleWorkDocument
  ) {
    return remove.vehicleWork(this, vehicleWork);
  }

  public async removeProduction(
    this: DailyReportDocument,
    production: ProductionDocument
  ) {
    return remove.production(this, production);
  }

  public async removeMaterialShipment(
    this: DailyReportDocument,
    materialShipment: MaterialShipmentDocument
  ) {
    return remove.materialShipment(this, materialShipment);
  }
}
