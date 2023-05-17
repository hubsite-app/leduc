import SchemaVersions from "@constants/SchemaVersions";
import { EmployeeClass, OperatorDailyReportClass, VehicleClass } from "@models";
import { prop, Ref } from "@typegoose/typegoose";
import { VehicleIssuePriority } from "@typescript/vehicleIssue";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class VehicleIssueSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => VehicleClass)
  @prop({ ref: () => VehicleClass, required: true })
  public vehicle!: Ref<VehicleClass>;

  @Field(() => EmployeeClass)
  @prop({ ref: () => EmployeeClass, required: true })
  public author!: Ref<EmployeeClass>;

  @Field(() => EmployeeClass, { nullable: true })
  @prop({ ref: () => EmployeeClass })
  public assignedTo?: Ref<EmployeeClass>;

  @Field()
  @prop({ required: true })
  public title!: string;

  @Field()
  @prop({ required: true })
  public description!: string;

  @Field(() => VehicleIssuePriority, { nullable: false })
  @prop({ required: true, enum: VehicleIssuePriority })
  public priority!: VehicleIssuePriority;

  @Field()
  @prop({ required: true, default: false })
  public closed!: boolean;

  @Field(() => OperatorDailyReportClass, { nullable: true })
  @prop({ ref: () => OperatorDailyReportClass })
  public operatorDailyReport?: Ref<OperatorDailyReportClass>;

  @Field()
  @prop({ required: true, default: SchemaVersions.VehicleIssue })
  public schemaVersion!: number;

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now })
  public createdAt!: Date;
}
