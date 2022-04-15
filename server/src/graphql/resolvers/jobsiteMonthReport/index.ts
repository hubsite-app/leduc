import {
  JobsiteClass,
  JobsiteDayReportClass,
  JobsiteMonthReport,
  JobsiteMonthReportDocument,
} from "@models";
import { Id } from "@typescript/models";
import { PubSubTopics } from "@typescript/pubSub";
import { JobsiteMonthReportClass } from "models/JobsiteMonthReport";
import {
  Arg,
  FieldResolver,
  ID,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";

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

  /**
   * ----- Subscriptions -----
   */

  @Subscription(() => JobsiteMonthReportClass, {
    topics: ({ args }) => {
      return `${PubSubTopics.JOBSITE_MONTH_REPORT}_${args.id}`;
    },
    nullable: true,
  })
  async jobsiteMonthReportSub(
    @Arg("id", () => ID) jobsiteMonthId: Id,
    @Root() { id }: { id: string }
  ) {
    return JobsiteMonthReport.getById(id);
  }
}
