import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";

import {
  CrewClass,
  DailyReport,
  DailyReportClass,
  DailyReportDocument,
  EmployeeClass,
  EmployeeWorkClass,
  JobsiteClass,
  MaterialShipmentClass,
  ProductionClass,
  ReportNoteClass,
  VehicleClass,
  VehicleWorkClass,
} from "@models";
import mutations, {
  DailyReportCreateData,
  DailyReportNoteUpdateData,
  DailyReportUpdateData,
} from "./mutations";
import { SearchOptions } from "@graphql/types/query";
import { FileCreateData } from "../file/mutations";
import { DailyReportListOptionData } from "./queries";
import { FilterQuery } from "mongoose";

@Resolver(() => DailyReportClass)
export default class DailyReportResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => JobsiteClass)
  async jobsite(@Root() dailyReport: DailyReportDocument) {
    return dailyReport.getJobsite();
  }

  @FieldResolver(() => CrewClass)
  async crew(@Root() dailyReport: DailyReportDocument) {
    return dailyReport.getCrew();
  }

  @FieldResolver(() => [EmployeeWorkClass])
  async employeeWork(@Root() dailyReport: DailyReportDocument) {
    return dailyReport.getEmployeeWork();
  }

  @FieldResolver(() => [VehicleWorkClass])
  async vehicleWork(@Root() dailyReport: DailyReportDocument) {
    return dailyReport.getVehicleWork();
  }

  @FieldResolver(() => [ProductionClass])
  async productions(@Root() dailyReport: DailyReportDocument) {
    return dailyReport.getProduction();
  }

  @FieldResolver(() => [MaterialShipmentClass])
  async materialShipments(@Root() dailyReport: DailyReportDocument) {
    return dailyReport.getMaterialShipments();
  }

  @FieldResolver(() => ReportNoteClass, { nullable: true })
  async reportNote(@Root() dailyReport: DailyReportDocument) {
    return dailyReport.getReportNote();
  }

  @FieldResolver(() => [EmployeeClass])
  async temporaryEmployees(@Root() dailyReport: DailyReportDocument) {
    return dailyReport.getTemporaryEmployees();
  }

  @FieldResolver(() => [VehicleClass])
  async temporaryVehicles(@Root() dailyReport: DailyReportDocument) {
    return dailyReport.getTemporaryVehicles();
  }

  /**
   * ----- Queries -----
   */

  @Query(() => DailyReportClass)
  async dailyReport(@Arg("id") id: string) {
    return DailyReport.getById(id);
  }

  @Query(() => [DailyReportClass])
  async dailyReports(
    @Arg("options", () => DailyReportListOptionData, { nullable: true })
    options?: DailyReportListOptionData
  ) {
    let query: FilterQuery<DailyReportDocument> = {};
    if (options?.crews && options.crews.length > 0) {
      query = {
        crew: { $in: options.crews },
      };
    }

    return DailyReport.getList({
      ...options,
      query,
    });
  }

  @Query(() => [DailyReportClass])
  async dailyReportSearch(
    @Arg("searchString") searchString: string,
    @Arg("options", () => SearchOptions, { nullable: true })
    options: SearchOptions
  ) {
    return (await DailyReport.search(searchString, options)).map(
      (object) => object.dailyReport
    );
  }

  /**
   * ----- Mutations -----
   */

  @Authorized()
  @Mutation(() => DailyReportClass)
  async dailyReportCreate(@Arg("data") data: DailyReportCreateData) {
    return mutations.create(data);
  }

  @Authorized()
  @Mutation(() => DailyReportClass)
  async dailyReportUpdate(
    @Arg("id") id: string,
    @Arg("data") data: DailyReportUpdateData
  ) {
    return mutations.update(id, data);
  }

  @Authorized()
  @Mutation(() => DailyReportClass)
  async dailyReportNoteUpdate(
    @Arg("id") id: string,
    @Arg("data") data: DailyReportNoteUpdateData
  ) {
    return mutations.updateNote(id, data);
  }

  @Authorized(["ADMIN"])
  @Mutation(() => DailyReportClass)
  async dailyReportJobCostApprovalUpdate(
    @Arg("id") id: string,
    @Arg("approved") approved: boolean
  ) {
    return mutations.updateJobCostApproval(id, approved);
  }

  @Authorized(["ADMIN"])
  @Mutation(() => DailyReportClass)
  async dailyReportPayrollCompleteUpdate(
    @Arg("id") id: string,
    @Arg("complete") complete: boolean
  ) {
    return mutations.updatePayrollComplete(id, complete);
  }

  @Authorized()
  @Mutation(() => DailyReportClass)
  async dailyReportAddTemporaryEmployee(
    @Arg("id") id: string,
    @Arg("employeeId") employeeId: string
  ) {
    return mutations.addTemporaryEmployee(id, employeeId);
  }

  @Authorized()
  @Mutation(() => DailyReportClass)
  async dailyReportAddTemporaryVehicle(
    @Arg("id") id: string,
    @Arg("vehicleId") vehicleId: string
  ) {
    return mutations.addTemporaryVehicle(id, vehicleId);
  }

  @Authorized()
  @Mutation(() => DailyReportClass)
  async dailyReportAddNoteFile(
    @Arg("id") id: string,
    @Arg("data") data: FileCreateData
  ) {
    return mutations.addNoteFile(id, data);
  }
}
