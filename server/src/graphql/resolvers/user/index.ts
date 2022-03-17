import { UserQuery } from "@graphql/types/query";
import { EmployeeClass, User, UserClass, UserDocument } from "@models";
import { IContext } from "@typescript/graphql";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import mutations, { LoginData, SignupData } from "./mutations";

@Resolver(() => UserClass)
export default class UserResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => EmployeeClass)
  async employee(@Root() user: UserDocument) {
    return user.getEmployee();
  }

  /**
   * ----- Query -----
   */

  @Authorized()
  @Query(() => UserClass)
  async currentUser(@Ctx() context: IContext) {
    return context.user!;
  }

  @Query(() => UserClass, { nullable: true })
  async user(@Arg("query") query: UserQuery) {
    if (query.id) {
      return User.getById(query.id);
    } else if (query.resetPasswordToken) {
      return User.getByResetPasswordToken(query.resetPasswordToken);
    } else {
      return null;
    }
  }

  /**
   * ----- Mutations -----
   */

  @Mutation(() => String)
  async signup(
    @Arg("signupId") signupId: string,
    @Arg("data", () => SignupData) data: SignupData
  ) {
    return mutations.signup(signupId, data);
  }

  @Mutation(() => String)
  async login(@Arg("data") data: LoginData) {
    return mutations.login(data);
  }

  @Authorized(["ADMIN"])
  @Mutation(() => UserClass)
  async userAdmin(@Arg("id") id: string, @Arg("isAdmin") isAdmin: boolean) {
    return mutations.admin(id, isAdmin);
  }

  @Mutation(() => Boolean)
  async userPasswordResetRequest(@Arg("email") email: string) {
    return mutations.passwordResetRequest(email);
  }

  @Mutation(() => Boolean)
  async userPasswordReset(
    @Arg("password") password: string,
    @Arg("token") token: string
  ) {
    return mutations.passwordReset(password, token);
  }
}
