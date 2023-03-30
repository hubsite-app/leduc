import { prop } from "@typegoose/typegoose";
import { EquipmentUsageUnits } from "@typescript/operatorDailyReport";
import { Types } from "mongoose";
import { Field, Float, ID, ObjectType } from "type-graphql";

@ObjectType()
export class EquipmentUsageSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => Float, { nullable: false })
  @prop({ required: true })
  public usage!: number;

  @Field(() => EquipmentUsageUnits, { nullable: false })
  @prop({ required: true, enum: EquipmentUsageUnits })
  public unit!: EquipmentUsageUnits;
}

@ObjectType()
export class OperatorChecklistSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field()
  @prop({ required: true })
  public walkaroundComplete!: boolean;

  @Field()
  @prop({ required: true })
  public visualInspectionComplete!: boolean;

  @Field()
  @prop({ required: true })
  public oilChecked!: boolean;

  @Field()
  @prop({ required: true })
  public coolantChecked!: boolean;

  @Field()
  @prop({ required: true })
  public fluidsChecked!: boolean;
}

@ObjectType()
export class EquipmentFunctionCheckSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field()
  @prop({ required: true })
  public backupAlarm!: boolean;

  @Field()
  @prop({ required: true })
  public lights!: boolean;

  @Field()
  @prop({ required: true })
  public fireExtinguisher!: boolean;

  @Field()
  @prop({ required: true })
  public licensePlate!: boolean;
}

@ObjectType()
export class EquipmentLeaksSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field()
  @prop({ required: true })
  public type!: string;

  @Field()
  @prop({ required: true })
  public location!: string;
}

@ObjectType()
export class EquipmentFluidAddedSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field()
  @prop({ required: true })
  public type!: string;

  @Field(() => Float)
  @prop({ required: true })
  public amount!: number;
}
