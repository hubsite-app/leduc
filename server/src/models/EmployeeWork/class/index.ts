import { ObjectType } from "type-graphql";
import { Types } from "mongoose";

import { EmployeeWorkDocument, EmployeeWorkModel } from "@models";
import { EmployeeWorkSchema } from "..";
import get from "./get";
import { GetByIDOptions } from "@typescript/models";
import update from "./update";
import { IEmployeeWorkUpdate } from "@typescript/employeeWork";

@ObjectType()
export class EmployeeWorkClass extends EmployeeWorkSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: EmployeeWorkModel,
    id: Types.ObjectId | string,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public async getEmployee(this: EmployeeWorkDocument) {
    return get.employee(this);
  }

  /**
   * ----- Update -----
   */

  public async updateDocument(
    this: EmployeeWorkDocument,
    data: IEmployeeWorkUpdate
  ) {
    return update.document(this, data);
  }
}
