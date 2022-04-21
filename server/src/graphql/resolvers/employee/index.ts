import { RatesData } from "@graphql/types/mutation";
import { SearchOptions } from "@graphql/types/query";
import {
  CrewClass,
  Employee,
  EmployeeClass,
  EmployeeDocument,
  SignupClass,
  UserClass,
} from "@models";
import pubsub from "@pubsub";
import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Publisher,
  PubSub,
  PubSubEngine,
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

  @FieldResolver(() => UserClass, { nullable: true })
  async user(@Root() employee: EmployeeDocument) {
    return employee.getUser();
  }

  @FieldResolver(() => [CrewClass])
  async crews(@Root() employee: EmployeeDocument) {
    return employee.getCrews();
  }

  @FieldResolver(() => SignupClass, { nullable: true })
  async signup(@Root() employee: EmployeeDocument) {
    return employee.getSignup();
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
    return (await Employee.search(searchString, options)).map(
      (object) => object.employee
    );
  }

  /**
   * ----- Mutations -----
   */

  @Authorized()
  @Mutation(() => EmployeeClass)
  async employeeCreate(
    @Arg("data") data: EmployeeCreateData,
    @Arg("crewId", { nullable: true }) crewId?: string
  ) {
    return mutations.create(data, crewId);
  }

  @Authorized(["ADMIN"])
  @Mutation(() => EmployeeClass)
  async employeeUpdateRates(
    @Arg("id") id: string,
    @Arg("data", () => [RatesData]) data: RatesData[]
  ) {
    return mutations.updateRates(id, data);
  }
}
