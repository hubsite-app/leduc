import {
  Crew,
  CrewClass,
  CrewDocument,
  EmployeeClass,
  JobsiteClass,
  VehicleClass,
} from "@models";
import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";

@Resolver(() => CrewClass)
export default class CrewResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => [EmployeeClass])
  async employees(@Root() crew: CrewDocument) {
    return crew.getEmployees();
  }

  @FieldResolver(() => [VehicleClass])
  async vehicles(@Root() crew: CrewDocument) {
    return crew.getVehicles();
  }

  @FieldResolver(() => [JobsiteClass])
  async jobsites(@Root() crew: CrewDocument) {
    return crew.getJobsites();
  }

  /**
   * ----- Query -----
   */

  @Query(() => CrewClass)
  async crew(@Arg("id") id: string) {
    return Crew.getById(id);
  }

  @Query(() => [CrewClass])
  async crewList() {
    return Crew.getList();
  }
}
