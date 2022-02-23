import { Types } from "mongoose";

import { UserDocument, UserModel } from "@models";
import { UserSchema } from "..";
import interact from "./interact";
import { GetByIDOptions } from "@typescript/models";
import get from "./get";
import { ObjectType } from "type-graphql";

@ObjectType()
export class UserClass extends UserSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: UserModel,
    id: Types.ObjectId | string,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public async getEmployee(this: UserDocument) {
    return get.employee(this);
  }

  /**
   * ----- Interact -----
   */

  public async checkPassword(this: UserDocument, password: string) {
    return interact.checkPassword(this, password);
  }
}
