import { JobsiteDayReportClass } from "@models";
import { Arg, Field, ObjectType, Query, Resolver } from "type-graphql";
import queries from "./queries";

@ObjectType()
export class JobsiteMonthlyReportClass {
  @Field(() => Date, { nullable: false })
  public startOfMonth!: Date;

  @Field(() => [JobsiteDayReportClass], { nullable: false })
  public dayReports!: JobsiteDayReportClass[];
}

@Resolver(() => JobsiteMonthlyReportClass)
export default class JobsiteMonthlyReportResolver {
  /**
   * ----- Queries -----
   */

  @Query(() => [JobsiteMonthlyReportClass])
  async jobsiteMonthlyReports(@Arg("jobsiteId") jobsiteId: string) {
    return queries.jobsiteMonthlyReports(jobsiteId);
  }
}
