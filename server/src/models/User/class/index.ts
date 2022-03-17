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
import { IEmailData } from "@utils/sendEmail";

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

  public static async getByResetPasswordToken(this: UserModel, token: string) {
    return get.byResetPasswordToken(this, token);
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

  public async sendEmail(this: UserDocument, data: IEmailData) {
    return interact.email(this, data);
  }

  /**
   * ----- Update -----
   */

  public async isAdmin(this: UserDocument, isAdmin: boolean) {
    return update.admin(this, isAdmin);
  }

  public async updatePassword(this: UserDocument, password: string) {
    return update.password(this, password);
  }

  public async setResetPasswordToken(this: UserDocument) {
    return update.resetPasswordToken(this);
  }
}
