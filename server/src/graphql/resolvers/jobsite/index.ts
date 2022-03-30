import { DefaultRateData } from "@graphql/types/mutation";
import { SearchOptions } from "@graphql/types/query";
import {
  CrewClass,
  DailyReportClass,
  InvoiceClass,
  Jobsite,
  JobsiteClass,
  JobsiteDocument,
  JobsiteMaterialClass,
} from "@models";
import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { InvoiceData } from "../invoice/mutations";
import { JobsiteMaterialCreateData } from "../jobsiteMaterial/mutations";
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

  @FieldResolver(() => [JobsiteMaterialClass])
  async materials(@Root() jobsite: JobsiteDocument) {
    return jobsite.getMaterials();
  }

  @FieldResolver(() => [InvoiceClass])
  async invoices(@Root() jobsite: JobsiteDocument) {
    return jobsite.getInvoices();
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

  @Authorized(["ADMIN"])
  @Mutation(() => JobsiteClass)
  async jobsiteCreate(@Arg("data") data: JobsiteCreateData) {
    return mutations.create(data);
  }

  @Authorized(["ADMIN"])
  @Mutation(() => JobsiteClass)
  async jobsiteAddMaterial(
    @Arg("jobsiteId") jobsiteId: string,
    @Arg("data") data: JobsiteMaterialCreateData
  ) {
    return mutations.addMaterial(jobsiteId, data);
  }

  @Authorized(["ADMIN"])
  @Mutation(() => JobsiteClass)
  async jobsiteAddInvoice(
    @Arg("jobsiteId") jobsiteId: string,
    @Arg("data") data: InvoiceData
  ) {
    return mutations.addInvoice(jobsiteId, data);
  }

  @Authorized(["ADMIN"])
  @Mutation(() => JobsiteClass)
  async jobsiteSetTruckingRates(
    @Arg("id") id: string,
    @Arg("data", () => [DefaultRateData]) data: DefaultRateData[]
  ) {
    return mutations.setTruckingRates(id, data);
  }
}
