import SchemaVersions from "@constants/SchemaVersions";
import { OperatorDailyReportClass, UserClass, VehicleClass } from "@models";
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

  @Field(() => UserClass)
  @prop({ ref: () => UserClass, required: true })
  public author!: Ref<UserClass>;

  @Field(() => UserClass, { nullable: true })
  @prop({ ref: () => UserClass })
  public assignedTo?: Ref<UserClass>;

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
