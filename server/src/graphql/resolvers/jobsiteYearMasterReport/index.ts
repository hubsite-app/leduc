import { JobsiteYearMasterReport, JobsiteYearMasterReportClass } from "@models";
import { Id } from "@typescript/models";
import { PubSubTopics } from "@typescript/pubSub";
import { Arg, ID, Query, Resolver, Root, Subscription } from "type-graphql";

@Resolver(() => JobsiteYearMasterReportClass)
export default class JobsiteYearMasterReportResolver {
  /**
   * ----- Queries -----
   */

  @Query(() => [JobsiteYearMasterReportClass])
  async jobsiteYearMasterReports() {
    return JobsiteYearMasterReport.find();
  }

  @Query(() => JobsiteYearMasterReportClass, { nullable: true })
  async jobsiteYearMasterReport(@Arg("id", () => ID) id: Id) {
    return JobsiteYearMasterReport.getById(id);
  }

  /**
   * ----- Subscriptions -----
   */

  @Subscription(() => JobsiteYearMasterReportClass, {
    topics: ({ args }) => {
      return `${PubSubTopics.JOBSITE_YEAR_MASTER_REPORT}_${args.id}`;
    },
    nullable: true,
  })
  async jobsiteYearMasterReportSub(
    @Arg("id", () => ID) jobsiteYearMasterId: Id,
    @Root() { id }: { id: string }
  ) {
    return JobsiteYearMasterReport.getById(id);
  }
}
