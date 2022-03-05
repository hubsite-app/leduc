import SchemaVersions from "@constants/SchemaVersions";
import {
  CrewClass,
  EmployeeWorkClass,
  JobsiteClass,
  MaterialShipmentClass,
  ProductionClass,
  ReportNoteClass,
  VehicleWorkClass,
} from "@models";
import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class DailyReportSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field({ nullable: false })
  @prop({ required: true })
  public date!: Date;

  @Field(() => JobsiteClass, { nullable: false })
  @prop({ ref: () => JobsiteClass, required: true })
  public jobsite!: Ref<JobsiteClass>;

  @Field(() => CrewClass, { nullable: false })
  @prop({ ref: () => CrewClass, required: true })
  public crew!: Ref<CrewClass>;

  @Field({ nullable: false })
  @prop({ required: true, default: false })
  public approved!: boolean;

  @Field(() => [EmployeeWorkClass])
  @prop({ ref: () => EmployeeWorkClass, default: [] })
  public employeeWork!: Ref<EmployeeWorkClass>[];

  @Field(() => [VehicleWorkClass])
  @prop({ ref: () => VehicleWorkClass, default: [] })
  public vehicleWork!: Ref<VehicleWorkClass>[];

  @Field(() => [ProductionClass])
  @prop({ ref: () => ProductionClass, default: [] })
  public production!: Ref<ProductionClass>[];

  @Field(() => [MaterialShipmentClass])
  @prop({ ref: () => MaterialShipmentClass, default: [] })
  public materialShipment!: Ref<MaterialShipmentClass>[];

  @Field(() => ReportNoteClass, { nullable: true })
  @prop({ ref: () => ReportNoteClass })
  public reportNote!: Ref<ReportNoteClass>;

  @Field()
  @prop({ required: true, default: SchemaVersions.DailyReport })
  public schemaVersion!: number;
}
