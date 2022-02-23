import { DailyReportClass, VehicleClass } from "@models";
import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class VehicleWorkSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field({ nullable: false })
  @prop({ required: true })
  public startTime!: Date;

  @Field({ nullable: false })
  @prop({ required: true })
  public endTime!: Date;

  @Field({ nullable: false })
  @prop({ required: true, trim: true })
  public jobTitle!: string;

  @Field({ nullable: false })
  @prop({ required: true })
  public hours!: number;

  @Field(() => VehicleClass, { nullable: false })
  @prop({ ref: () => VehicleClass, required: true })
  public vehicle!: Ref<VehicleClass>;

  /**
   * @deprecated DailyReport holds a link to this document
   */
  @Field(() => DailyReportClass)
  @prop({ ref: () => DailyReportClass })
  public dailyReport!: Ref<DailyReportClass>;
}
