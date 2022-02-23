import {
  CrewClass,
  Employee,
  EmployeeClass,
  EmployeeDocument,
  UserClass,
} from "@models";
import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";

@Resolver(() => EmployeeClass)
export default class EmployeeResolver {
  /**
   * ----- Field Resolver -----
   */

  @FieldResolver(() => UserClass)
  async user(@Root() employee: EmployeeDocument) {
    return employee.getUser();
  }

  @FieldResolver(() => [CrewClass])
  async crews(@Root() employee: EmployeeDocument) {
    return employee.getCrews();
  }

  /**
   * ----- Queries -----
   */

  @Query(() => EmployeeClass)
  async employee(@Arg("id") id: string) {
    return Employee.getById(id);
  }
}
