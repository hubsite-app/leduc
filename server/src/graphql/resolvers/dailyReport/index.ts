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
  EmployeeWorkClass,
  JobsiteClass,
  MaterialShipmentClass,
  ProductionClass,
  ReportNoteClass,
  VehicleWorkClass,
} from "@models";
import { ListOptionData } from "@typescript/graphql";
import mutations, {
  DailyReportNoteUpdateData,
  DailyReportUpdateData,
} from "./mutations";
import { SearchOptions } from "@graphql/types/query";

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

  /**
   * ----- Queries -----
   */

  @Query(() => DailyReportClass)
  async dailyReport(@Arg("id") id: string) {
    return DailyReport.getById(id);
  }

  @Query(() => [DailyReportClass])
  async dailyReports(
    @Arg("options", () => ListOptionData, { nullable: true })
    options?: ListOptionData
  ) {
    return DailyReport.getList(options);
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
  async dailyReportApprovalUpdate(
    @Arg("id") id: string,
    @Arg("approved") approved: boolean
  ) {
    return mutations.updateApproval(id, approved);
  }
}
