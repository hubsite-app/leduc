import { post, prop, Ref } from "@typegoose/typegoose";
import {
  DailyReportClass,
  JobsiteClass,
  JobsiteDayReportDocument,
  JobsiteMonthReport,
} from "@models";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import {
  EmployeeReportClass,
  InvoiceReportClass,
  MaterialReportClass,
  NonCostedMaterialReportClass,
  SummaryReportClass,
  TruckingReportClass,
  VehicleReportClass,
} from "./subDocument";
import SchemaVersions from "@constants/SchemaVersions";

export * from "./subDocument";

@ObjectType()
@post<JobsiteDayReportDocument>("save", async (jobsiteDayReport) => {
  await JobsiteMonthReport.buildDocumentAndSave({
    jobsiteId: jobsiteDayReport.jobsite!,
    date: jobsiteDayReport.date,
  });
})
export class JobsiteDayReportSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => JobsiteClass, { nullable: false })
  @prop({ ref: () => JobsiteClass, required: true })
  public jobsite!: Ref<JobsiteClass>;

  @Field(() => Date, { nullable: false })
  @prop({ required: true })
  public date!: Date;

  @Field(() => [DailyReportClass], { nullable: false })
  @prop({ ref: () => DailyReportClass, required: true, default: [] })
  public dailyReports!: Ref<DailyReportClass>[];

  @Field(() => [EmployeeReportClass], { nullable: false })
  @prop({ type: () => EmployeeReportClass, required: true, default: [] })
  public employees!: EmployeeReportClass[];

  @Field(() => [VehicleReportClass], { nullable: false })
  @prop({ type: () => VehicleReportClass, required: true, default: [] })
  public vehicles!: VehicleReportClass[];

  @Field(() => [MaterialReportClass], { nullable: false })
  @prop({ type: () => MaterialReportClass, required: true, default: [] })
  public materials!: MaterialReportClass[];

  @Field(() => [NonCostedMaterialReportClass], { nullable: false })
  @prop({
    type: () => NonCostedMaterialReportClass,
    required: true,
    default: [],
  })
  public nonCostedMaterials!: NonCostedMaterialReportClass[];

  @Field(() => [TruckingReportClass], { nullable: false })
  @prop({ type: () => TruckingReportClass, required: true, default: [] })
  public trucking!: TruckingReportClass[];

  @Field(() => [InvoiceReportClass], { nullable: false })
  @prop({ type: () => InvoiceReportClass, required: true, default: [] })
  public expenseInvoices!: InvoiceReportClass[];

  @Field(() => [InvoiceReportClass], { nullable: false })
  @prop({ type: () => InvoiceReportClass, required: true, default: [] })
  public revenueInvoices!: InvoiceReportClass[];

  @Field(() => SummaryReportClass, { nullable: false })
  @prop({ type: () => SummaryReportClass, required: true, default: {} })
  public summary!: SummaryReportClass;

  @Field()
  @prop({ required: true, default: SchemaVersions.JobsiteDayReport })
  public schemaVersion!: number;
}
