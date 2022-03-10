import { Types } from "mongoose";

import { SignupDocument, UserDocument, UserModel } from "@models";
import { UserSchema } from "..";
import interact from "./interact";
import { GetByIDOptions } from "@typescript/models";
import get from "./get";
import { ObjectType } from "type-graphql";
import { IUserCreate } from "@typescript/user";
import create from "./create";
import update from "./update";

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

  public static async getByEmail(this: UserModel, email: string) {
    return get.byEmail(this, email);
  }

  public async getEmployee(this: UserDocument) {
    return get.employee(this);
  }

  /**
   * ----- Create -----
   */

  public static async createDocument(
    this: UserModel,
    signup: SignupDocument,
    data: IUserCreate
  ) {
    return create.document(this, signup, data);
  }

  /**
   * ----- Interact -----
   */

  public static async login(
    this: UserModel,
    email: string,
    password: string,
    rememberMe: boolean
  ) {
    return interact.login(this, email, password, rememberMe);
  }

  public async checkPassword(this: UserDocument, password: string) {
    return interact.checkPassword(this, password);
  }

  /**
   * ----- Update -----
   */

  public async isAdmin(this: UserDocument, isAdmin: boolean) {
    return update.admin(this, isAdmin);
  }
}
