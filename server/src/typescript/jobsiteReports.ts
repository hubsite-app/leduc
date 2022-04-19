import { JobsiteClass, JobsiteDayReportClass } from "@models";
import { DocumentType, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, Float, ID, ObjectType } from "type-graphql";
import { CrewTypes } from "./crew";
import { InvoiceReportClass } from "./invoice";
import { Id, UpdateClass } from "./models";

export interface IJobsiteReportBuild {
  jobsiteId: Id;
  date: Date;
}

@ObjectType()
export class RangeSummaryReportClass {
  @Field(() => ID, { nullable: false })
  public _id?: Types.ObjectId;

  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public externalExpenseInvoiceValue!: number;

  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public internalExpenseInvoiceValue!: number;

  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public externalRevenueInvoiceValue!: number;

  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public internalRevenueInvoiceValue!: number;
}

@ObjectType()
export class JobsiteReportBaseClass {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => JobsiteClass, { nullable: false })
  @prop({ ref: () => JobsiteClass, required: true })
  public jobsite!: Ref<JobsiteClass>;

  @Field(() => [JobsiteDayReportClass], { nullable: false })
  @prop({ ref: () => JobsiteDayReportClass, default: [], required: true })
  public dayReports!: Ref<JobsiteDayReportClass>[];

  @Field(() => [InvoiceReportClass], { nullable: false })
  @prop({ type: () => InvoiceReportClass, required: true, default: [] })
  public expenseInvoices!: InvoiceReportClass[];

  @Field(() => [InvoiceReportClass], { nullable: false })
  @prop({ type: () => InvoiceReportClass, required: true, default: [] })
  public revenueInvoices!: InvoiceReportClass[];

  @Field(() => RangeSummaryReportClass, { nullable: false })
  @prop({ type: () => RangeSummaryReportClass, required: true, default: {} })
  public summary!: RangeSummaryReportClass;

  @Field(() => [CrewTypes], { nullable: false })
  @prop({ type: [String], enum: CrewTypes, required: true, default: [] })
  public crewTypes!: CrewTypes[];

  @Field(() => UpdateClass, { nullable: false })
  @prop({ type: () => UpdateClass, required: true, default: {} })
  public update!: UpdateClass;
}

@ObjectType()
class SummaryBaseReport {
  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public employeeHours!: number;

  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public employeeCost!: number;

  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public vehicleHours!: number;

  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public vehicleCost!: number;

  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public materialQuantity!: number;

  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public materialCost!: number;

  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public nonCostedMaterialQuantity!: number;

  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public truckingQuantity!: number;

  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public truckingHours!: number;

  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public truckingCost!: number;
}

@ObjectType()
export class OnSiteSummaryReportClass extends SummaryBaseReport {
  @Field(() => ID, { nullable: false })
  public _id?: Types.ObjectId;

  @Field(() => [CrewTypeOnSiteSummaryClass], { nullable: false })
  @prop({ type: () => CrewTypeOnSiteSummaryClass, required: true, default: [] })
  public crewTypeSummaries!: CrewTypeOnSiteSummaryClass[];
}

export interface OnSiteSummaryReportDocument
  extends DocumentType<OnSiteSummaryReportClass> {}

@ObjectType()
export class CrewTypeOnSiteSummaryClass extends SummaryBaseReport {
  @Field(() => ID, { nullable: false })
  public _id?: Types.ObjectId;

  @Field(() => CrewTypes, { nullable: false })
  @prop({ enum: CrewTypes, required: true })
  public crewType!: CrewTypes;
}

@ObjectType()
export class JobsiteMasterReportItemClass {
  @Field(() => ID, { nullable: false })
  public _id?: Types.ObjectId;

  @Field(() => OnSiteSummaryReportClass, { nullable: false })
  @prop({ required: true, default: {}, type: () => OnSiteSummaryReportClass })
  public summary!: OnSiteSummaryReportClass;
}
