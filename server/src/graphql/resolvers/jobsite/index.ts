import { SearchOptions } from "@graphql/types/query";
import {
  CrewClass,
  DailyReportClass,
  Jobsite,
  JobsiteClass,
  JobsiteDocument,
} from "@models";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import mutations, { JobsiteCreateData } from "./mutations";

@Resolver(() => JobsiteClass)
export default class JobsiteResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => [CrewClass])
  async crews(@Root() jobsite: JobsiteDocument) {
    return jobsite.getCrews();
  }

  @FieldResolver(() => [DailyReportClass])
  async dailyReports(@Root() jobsite: JobsiteDocument) {
    return jobsite.getDailyReports();
  }

  /**
   * ----- Queries -----
   */

  @Query(() => JobsiteClass)
  async jobsite(@Arg("id") id: string) {
    return Jobsite.getById(id);
  }

  @Query(() => [JobsiteClass])
  async jobsiteSearch(
    @Arg("searchString") searchString: string,
    @Arg("options", () => SearchOptions, { nullable: true })
    options: SearchOptions
  ) {
    return (await Jobsite.search(searchString, options)).map(
      (object) => object.jobsite
    );
  }

  /**
   * ----- Mutations -----
   */

  @Mutation(() => JobsiteClass)
  async jobsiteCreate(@Arg("data") data: JobsiteCreateData) {
    return mutations.create(data);
  }
}
