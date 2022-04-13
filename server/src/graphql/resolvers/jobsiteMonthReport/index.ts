import {
  JobsiteClass,
  JobsiteDayReportClass,
  JobsiteMonthReport,
  JobsiteMonthReportDocument,
} from "@models";
import { Id } from "@typescript/models";
import { JobsiteMonthReportClass } from "models/JobsiteMonthReport";
import { Arg, FieldResolver, ID, Query, Resolver, Root } from "type-graphql";

@Resolver(() => JobsiteMonthReportClass)
export default class JobsiteMonthReportResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => [JobsiteDayReportClass])
  async dayReports(@Root() jobsiteMonthReport: JobsiteMonthReportDocument) {
    return jobsiteMonthReport.getDayReports();
  }

  @FieldResolver(() => JobsiteClass)
  async jobsite(@Root() jobsiteMonthReport: JobsiteMonthReportDocument) {
    return jobsiteMonthReport.getJobsite();
  }

  /**
   * ----- Queries -----
   */

  @Query(() => JobsiteMonthReportClass, { nullable: true })
  async jobsiteMonthReport(@Arg("id", () => ID) id: Id) {
    return JobsiteMonthReport.getById(id);
  }
}
