import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";

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

  @FieldResolver(() => [ReportNoteClass])
  async reportNotes(@Root() dailyReport: DailyReportDocument) {
    return dailyReport.getReportNotes();
  }

  /**
   * ----- Queries -----
   */

  @Query(() => DailyReportClass)
  async dailyReport(@Arg("id") id: string) {
    return DailyReport.getById(id);
  }
}
