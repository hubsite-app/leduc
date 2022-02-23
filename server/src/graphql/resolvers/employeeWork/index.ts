import { FieldResolver, Resolver, Root } from "type-graphql";

import {
  EmployeeClass,
  EmployeeWorkClass,
  EmployeeWorkDocument,
} from "@models";

@Resolver(() => EmployeeWorkClass)
export default class EmployeeWorkResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => EmployeeClass)
  async employee(@Root() employeeWork: EmployeeWorkDocument) {
    return employeeWork.getEmployee();
  }
}
