import { JobsiteMaterialDocument, JobsiteMaterialModel } from "@models";
import {
  IJobsiteMaterialCreate,
  IJobsiteMaterialUpdate,
} from "@typescript/jobsiteMaterial";
import { GetByIDOptions, Id } from "@typescript/models";
import { ObjectType } from "type-graphql";
import { JobsiteMaterialSchema } from "../schema";
import create from "./create";
import get from "./get";
import update from "./update";

@ObjectType()
export class JobsiteMaterialClass extends JobsiteMaterialSchema {
  /**
   * ----- GET -----
   */

  public static async getById(
    this: JobsiteMaterialModel,
    id: Id,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public async getMaterial(this: JobsiteMaterialDocument) {
    return get.material(this);
  }

  public async getSupplier(this: JobsiteMaterialDocument) {
    return get.supplier(this);
  }

  public async getJobsite(this: JobsiteMaterialDocument) {
    return get.jobsite(this);
  }

  public async getCompletedQuantity(this: JobsiteMaterialDocument) {
    return get.completedQuantity(this);
  }

  public async getRateForTime(this: JobsiteMaterialDocument, date: Date) {
    return get.rateForTime(this, date);
  }

  /**
   * ----- Create -----
   */

  public static async createDocument(
    this: JobsiteMaterialModel,
    data: IJobsiteMaterialCreate
  ) {
    return create.document(this, data);
  }

  /**
   * ----- Update -----
   */

  public async updateDocument(
    this: JobsiteMaterialDocument,
    data: IJobsiteMaterialUpdate
  ) {
    return update.document(this, data);
  }
}
