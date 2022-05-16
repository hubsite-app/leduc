import {
  JobsiteClass,
  JobsiteDayReportClass,
  JobsiteYearReport,
  JobsiteYearReportDocument,
  JobsiteYearReportClass,
} from "@models";
import { Id } from "@typescript/models";
import { PubSubTopics } from "@typescript/pubSub";
import {
  Arg,
  FieldResolver,
  ID,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import excel from "./excel";

@Resolver(() => JobsiteYearReportClass)
export default class JobsiteYearReportResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => [JobsiteDayReportClass])
  async dayReports(@Root() jobsiteYearReport: JobsiteYearReportDocument) {
    return jobsiteYearReport.getDayReports();
  }

  @FieldResolver(() => JobsiteClass)
  async jobsite(@Root() jobsiteYearReport: JobsiteYearReportDocument) {
    return jobsiteYearReport.getJobsite();
  }

  /**
   * ----- Queries -----
   */

  @Query(() => JobsiteYearReportClass, { nullable: true })
  async jobsiteYearReport(@Arg("id", () => ID) id: Id) {
    return JobsiteYearReport.getById(id);
  }

  @Query(() => Boolean)
  async jobsiteYearReportExcel(@Arg("id", () => ID) id: Id) {
    excel(id);
    return true;
  }

  /**
   * ----- Subscriptions -----
   */

  @Subscription(() => JobsiteYearReportClass, {
    topics: ({ args }) => {
      return `${PubSubTopics.JOBSITE_YEAR_REPORT}_${args.id}`;
    },
    nullable: true,
  })
  async jobsiteYearReportSub(
    @Arg("id", () => ID) jobsiteYearId: Id,
    @Root() { id }: { id: string }
  ) {
    return JobsiteYearReport.getById(id);
  }
}
