import SchemaVersions from "@constants/SchemaVersions";
import { prop, Ref } from "@typegoose/typegoose";
import { UserClass } from "models/User";
import { VehicleClass } from "models/Vehicle";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import {
  EquipmentFluidAddedSchema,
  EquipmentFunctionCheckSchema,
  EquipmentLeaksSchema,
  EquipmentUsageSchema,
  OperatorChecklistSchema,
} from "./subDocuments";

@ObjectType()
export class OperatorDailyReportSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => VehicleClass)
  @prop({ ref: () => VehicleClass, required: true })
  public vehicle!: Ref<VehicleClass>;

  @Field(() => UserClass, { nullable: false })
  @prop({ ref: () => UserClass, required: true })
  public author!: Ref<UserClass>;

  @Field(() => EquipmentUsageSchema, { nullable: false })
  @prop({ type: () => EquipmentUsageSchema, required: true })
  public equipmentUsage!: EquipmentUsageSchema;

  @Field(() => Date, { nullable: false })
  @prop({ required: true })
  public startTime!: Date;

  @Field(() => OperatorChecklistSchema, { nullable: false })
  @prop({ type: () => OperatorChecklistSchema, required: true })
  public checklist!: OperatorChecklistSchema;

  @Field(() => EquipmentFunctionCheckSchema)
  @prop({ type: () => EquipmentFunctionCheckSchema, required: true })
  public functionChecks!: EquipmentFunctionCheckSchema;

  @Field()
  @prop({ required: true })
  public malfunction!: boolean;

  @Field()
  @prop({ required: true })
  public damageObserved!: boolean;

  @Field(() => [EquipmentLeaksSchema])
  @prop({ type: () => [EquipmentLeaksSchema], required: true, default: [] })
  public leaks!: EquipmentLeaksSchema[];

  @Field(() => [EquipmentFluidAddedSchema])
  @prop({
    type: () => [EquipmentFluidAddedSchema],
    required: true,
    default: [],
  })
  public fluidsAdded!: EquipmentFluidAddedSchema[];

  @Field()
  @prop({ required: true, default: SchemaVersions.OperatorDailyReport })
  public schemaVersion!: number;

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now })
  public createdAt!: Date;
}
