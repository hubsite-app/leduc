import { DailyReportClass, VehicleClass } from "@models";
import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { VehicleObjectClass } from "./subDocuments";

@ObjectType()
export class MaterialShipmentSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field({ nullable: false })
  @prop({ required: true })
  public shipmentType!: string;

  @Field({ nullable: false })
  @prop({ required: true })
  public quantity!: number;

  @Field({ nullable: false })
  @prop({ required: true })
  public unit!: string;

  @Field()
  @prop()
  public startTime?: Date;

  @Field()
  @prop()
  public endTime?: Date;

  @Field()
  @prop({ trim: true })
  public supplier?: string;

  @Field(() => VehicleClass, { nullable: true })
  @prop({ ref: () => VehicleClass })
  public vehicle?: Ref<VehicleClass>;

  @Field(() => VehicleObjectClass, { nullable: true })
  @prop({ type: () => VehicleObjectClass })
  public vehicleObject?: VehicleObjectClass;

  /**
   * @deprecated link is already held in DailyReport document
   */
  @Field(() => DailyReportClass)
  @prop({ ref: () => DailyReportClass })
  public dailyReport!: Ref<DailyReportClass>;
}
