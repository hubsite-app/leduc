import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import {
  CrewDocument,
  InvoiceDocument,
  JobsiteDocument,
  JobsiteMaterialDocument,
  JobsiteModel,
} from "@models";
import { JobsiteSchema } from "..";
import get from "./get";
import {
  GetByIDOptions,
  IDefaultRateData,
  ISearchOptions,
} from "@typescript/models";
import {
  IJobsiteCreate,
  ITruckingRateData,
  ITruckingTypeRateData,
} from "@typescript/jobsite";
import create from "./create";
import update from "./update";

@ObjectType()
export class JobsiteClass extends JobsiteSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: JobsiteModel,
    id: Types.ObjectId | string,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public static async search(
    this: JobsiteModel,
    searchString: string,
    options?: ISearchOptions
  ) {
    return get.search(this, searchString, options);
  }

  public static async getByCrew(this: JobsiteModel, crew: CrewDocument) {
    return get.byCrew(this, crew);
  }

  public async getCrews(this: JobsiteDocument) {
    return get.crews(this);
  }

  public async getDailyReports(this: JobsiteDocument) {
    return get.dailyReports(this);
  }

  public async getMaterials(this: JobsiteDocument) {
    return get.materials(this);
  }

  public async getExpenseInvoices(this: JobsiteDocument) {
    return get.expenseInvoices(this);
  }

  public async getRevenueInvoices(this: JobsiteDocument) {
    return get.revenueInvoices(this);
  }

  public async getNonCostedMaterialShipments(this: JobsiteDocument) {
    return get.nonCostedMaterialShipments(this);
  }

  /**
   * ----- Create -----
   */

  public static async createDocument(this: JobsiteModel, data: IJobsiteCreate) {
    return create.document(this, data);
  }

  /**
   * ----- Update -----
   */

  public async addMaterial(
    this: JobsiteDocument,
    jobsiteMaterial: JobsiteMaterialDocument
  ) {
    return update.addMaterial(this, jobsiteMaterial);
  }

  public async addExpenseInvoice(
    this: JobsiteDocument,
    invoice: InvoiceDocument
  ) {
    return update.addExpenseInvoice(this, invoice);
  }

  public async addRevenueInvoice(
    this: JobsiteDocument,
    invoice: InvoiceDocument
  ) {
    return update.addRevenueInvoice(this, invoice);
  }

  public async setTruckingRates(
    this: JobsiteDocument,
    truckingRates: ITruckingTypeRateData[]
  ) {
    return update.truckingRates(this, truckingRates);
  }
}
