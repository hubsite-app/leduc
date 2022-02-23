import { DailyReportClass } from "@models";
import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class ProductionSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field({ nullable: false })
  @prop({ required: true, trim: true })
  public jobTitle!: string;

  @Field({ nullable: false })
  @prop({ required: true })
  public quantity!: number;

  @Field({ nullable: false })
  @prop({ required: true, trim: true })
  public unit!: string;

  @Field({ nullable: true })
  @prop()
  public startTime?: Date;

  @Field({ nullable: true })
  @prop()
  public endTime?: Date;

  @Field()
  @prop({ trim: true })
  public description?: string;

  /**
   * @deprecated link already exists in DailyReport document
   */
  @Field(() => DailyReportClass)
  @prop({ ref: () => DailyReportClass })
  public dailyReport!: Ref<DailyReportClass>;
}
