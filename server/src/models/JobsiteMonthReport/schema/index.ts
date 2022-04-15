import SchemaVersions from "@constants/SchemaVersions";
import { post, prop, Ref } from "@typegoose/typegoose";
import { CrewTypes } from "@typescript/crew";
import {
  JobsiteClass,
  JobsiteDayReportClass,
  JobsiteMonthReportDocument,
} from "@models";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { InvoiceReportClass, MonthSummaryReportClass } from "./subDocuments";
import { UpdateClass } from "@typescript/models";
import pubsub from "@pubsub";
import { PubSubTopics } from "@typescript/pubSub";

export * from "./subDocuments";

@ObjectType()
@post<JobsiteMonthReportDocument>("save", async (jobsiteMonthReport) => {
  console.log(jobsiteMonthReport._id);
  await pubsub.publish(
    `${PubSubTopics.JOBSITE_MONTH_REPORT}_${jobsiteMonthReport._id}`,
    {
      id: jobsiteMonthReport._id,
    }
  );
})
export class JobsiteMonthReportSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => JobsiteClass, { nullable: false })
  @prop({ ref: () => JobsiteClass, required: true })
  public jobsite!: Ref<JobsiteClass>;

  @Field(() => Date, { nullable: false })
  @prop({ required: true })
  public startOfMonth!: Date;

  @Field(() => [JobsiteDayReportClass], { nullable: false })
  @prop({ ref: () => JobsiteDayReportClass, default: [], required: true })
  public dayReports!: Ref<JobsiteDayReportClass>[];

  @Field(() => [InvoiceReportClass], { nullable: false })
  @prop({ type: () => InvoiceReportClass, required: true, default: [] })
  public expenseInvoices!: InvoiceReportClass[];

  @Field(() => [InvoiceReportClass], { nullable: false })
  @prop({ type: () => InvoiceReportClass, required: true, default: [] })
  public revenueInvoices!: InvoiceReportClass[];

  @Field(() => MonthSummaryReportClass, { nullable: false })
  @prop({ type: () => MonthSummaryReportClass, required: true, default: {} })
  public summary!: MonthSummaryReportClass;

  @Field(() => [CrewTypes], { nullable: false })
  @prop({ type: [String], enum: CrewTypes, required: true, default: [] })
  public crewTypes!: CrewTypes[];

  @Field(() => UpdateClass, { nullable: false })
  @prop({ type: () => UpdateClass, required: true, default: {} })
  public update!: UpdateClass;

  @Field()
  @prop({ required: true, default: SchemaVersions.JobsiteMonthReport })
  public schemaVersion!: number;
}
