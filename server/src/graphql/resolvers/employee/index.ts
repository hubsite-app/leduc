import { SearchOptions } from "@graphql/types/query";
import {
  CrewClass,
  Employee,
  EmployeeClass,
  EmployeeDocument,
  UserClass,
} from "@models";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import mutations, { EmployeeCreateData } from "./mutations";

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

  @Query(() => [EmployeeClass])
  async employeeSearch(
    @Arg("searchString") searchString: string,
    @Arg("options", () => SearchOptions, { nullable: true })
    options: SearchOptions
  ) {
    return Employee.search(searchString, options);
  }

  /**
   * ----- Mutations -----
   */

  @Mutation(() => EmployeeClass)
  async employeeCreate(
    @Arg("data") data: EmployeeCreateData,
    @Arg("crewId", { nullable: true }) crewId?: string
  ) {
    return mutations.create(data, crewId);
  }
}
