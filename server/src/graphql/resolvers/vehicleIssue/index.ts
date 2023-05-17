import {
  EmployeeClass,
  OperatorDailyReportClass,
  VehicleClass,
  VehicleIssue,
  VehicleIssueClass,
  VehicleIssueDocument,
} from "@models";
import { IContext, ListOptionData } from "@typescript/graphql";
import { Id } from "@typescript/models";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import mutations, { VehicleIssueCreateData } from "./mutations";

@Resolver(() => VehicleIssueClass)
export default class VehicleIssueResolver {
  /**
   * --- Field Resolvers ---
   */

  @FieldResolver(() => VehicleClass)
  async vehicle(@Root() vehicleIssue: VehicleIssueDocument) {
    return vehicleIssue.getVehicle();
  }

  @FieldResolver(() => EmployeeClass)
  async author(@Root() vehicleIssue: VehicleIssueDocument) {
    return vehicleIssue.getAuthor();
  }

  @FieldResolver(() => EmployeeClass, { nullable: true })
  async assignedTo(@Root() vehicleIssue: VehicleIssueDocument) {
    return vehicleIssue.getAssignedTo();
  }

  @FieldResolver(() => OperatorDailyReportClass, { nullable: true })
  async operatorDailyReport(@Root() vehicleIssue: VehicleIssueDocument) {
    return vehicleIssue.getOperatorDailyReport();
  }

  /**
   * --- Queries ---
   */

  @Query(() => VehicleIssueClass)
  async vehicleIssue(@Arg("id", () => ID) id: Id) {
    return VehicleIssue.getById(id);
  }

  @Query(() => [VehicleIssueClass])
  async vehicleIssues(
    @Arg("options", () => ListOptionData, { nullable: true })
    options?: ListOptionData
  ) {
    return VehicleIssue.getList({
      ...options,
    });
  }

  /**
   * --- Mutations ---
   */

  @Authorized()
  @Mutation(() => VehicleIssueClass)
  async vehicleIssueCreate(
    @Arg("vehicleId", () => ID) vehicleId: Id,
    @Arg("data") data: VehicleIssueCreateData,
    @Ctx() context: IContext
  ) {
    if (!context.user) throw new Error("Must be logged in to do this");
    const employee = await context.user.getEmployee();
    if (!employee)
      throw new Error(
        "You do not have an employee account, please contact support"
      );

    return mutations.create(vehicleId, employee, data);
  }

  @Authorized(["PM"])
  @Mutation(() => VehicleIssueClass)
  async vehicleIssueAssignedToUpdate(
    @Arg("id", () => ID) id: Id,
    @Arg("assignedTo", () => ID, { nullable: true }) assignedTo?: Id
  ) {
    return mutations.assignedToUpdate(id, assignedTo);
  }

  @Authorized(["PM"])
  @Mutation(() => VehicleIssueClass)
  async vehicleIssueClose(@Arg("id", () => ID) id: Id) {
    return mutations.close(id);
  }
}
