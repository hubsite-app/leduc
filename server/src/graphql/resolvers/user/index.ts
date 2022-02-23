import { EmployeeClass, User, UserClass, UserDocument } from "@models";
import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";

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

  @Query(() => UserClass)
  async user(@Arg("id") id: string) {
    return User.getById(id);
  }
}
