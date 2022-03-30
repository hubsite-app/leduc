import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import { EmployeeDocument, EmployeeModel } from "@models";
import { EmployeeSchema } from "../schema";
import get from "./get";
import { GetByIDOptions, IRatesData, ISearchOptions } from "@typescript/models";
import { IEmployeeCreate } from "@typescript/employee";
import create from "./create";
import update from "./update";

@ObjectType()
export class EmployeeClass extends EmployeeSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: EmployeeModel,
    id: Types.ObjectId | string,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public static async search(
    this: EmployeeModel,
    searchString: string,
    options?: ISearchOptions
  ) {
    return get.search(this, searchString, options);
  }

  public static async getByName(this: EmployeeModel, name: string) {
    return get.byName(this, name);
  }

  public static async getList(this: EmployeeModel) {
    return get.list(this);
  }

  public async getUser(this: EmployeeDocument) {
    return get.user(this);
  }

  public async getCrews(this: EmployeeDocument) {
    return get.crews(this);
  }

  public async getSignup(this: EmployeeDocument) {
    return get.signup(this);
  }

  /**
   * ----- Create -----
   */

  public static async createDocument(
    this: EmployeeModel,
    data: IEmployeeCreate
  ) {
    return create.document(this, data);
  }

  /**
   * ----- Update -----
   */

  public async updateRates(this: EmployeeDocument, data: IRatesData[]) {
    return update.rates(this, data);
  }
}
