import SchemaVersions from "@constants/SchemaVersions";
import { prop, Ref } from "@typegoose/typegoose";
import { CrewTypes } from "@typescript/crew";
import { JobsiteClass, JobsiteDayReportClass } from "@models";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
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

  @Field(() => [CrewTypes], { nullable: false })
  @prop({ type: [String], enum: CrewTypes, required: true, default: [] })
  public crewTypes!: CrewTypes[];

  @Field()
  @prop({ required: true, default: SchemaVersions.JobsiteMonthReport })
  public schemaVersion!: number;
}
