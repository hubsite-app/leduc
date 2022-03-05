import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import { EmployeeDocument, EmployeeModel } from "@models";
import { EmployeeSchema } from "../schema";
import get from "./get";
import { GetByIDOptions } from "@typescript/models";
import { IEmployeeCreate } from "@typescript/employee";
import create from "./create";

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

  public static async getList(this: EmployeeModel) {
    return get.list(this);
  }

  public async getUser(this: EmployeeDocument) {
    return get.user(this);
  }

  public async getCrews(this: EmployeeDocument) {
    return get.crews(this);
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
}
