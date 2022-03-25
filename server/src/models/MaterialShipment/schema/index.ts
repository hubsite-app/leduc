import SchemaVersions from "@constants/SchemaVersions";
import { DailyReportClass, VehicleClass, JobsiteMaterialClass } from "@models";
import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { VehicleObjectClass } from "./subDocuments";

@ObjectType()
export class MaterialShipmentSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  /**
   * @version 1
   */
  @Field({ nullable: true })
  @prop({ required: false })
  public shipmentType!: string;

  /**
   * @version 1
   */
  @Field()
  @prop({ trim: true })
  public supplier?: string;

  /**
   * @version 1
   */
  @Field({ nullable: true })
  @prop({ required: false })
  public unit!: string;

  @Field({ nullable: false })
  @prop({ required: true })
  public quantity!: number;

  /**
   * @version 2
   */
  @Field(() => JobsiteMaterialClass, { nullable: true })
  @prop({ ref: () => JobsiteMaterialClass, required: false })
  public jobsiteMaterial?: Ref<JobsiteMaterialClass>;

  @Field({ nullable: true })
  @prop()
  public startTime?: Date;

  @Field({ nullable: true })
  @prop()
  public endTime?: Date;

  @Field(() => VehicleClass, { nullable: true })
  @prop({ ref: () => VehicleClass })
  public vehicle?: Ref<VehicleClass>;

  @Field(() => VehicleObjectClass, { nullable: true })
  @prop({ type: () => VehicleObjectClass })
  public vehicleObject?: VehicleObjectClass;

  /**
   * @desc if a legacy document, which version was this made in
   */
  @Field({ nullable: true })
  @prop()
  public legacyVersion?: number;

  @Field()
  @prop({ required: true, default: SchemaVersions.MaterialShipment })
  public schemaVersion!: number;

  /**
   * @deprecated link is already held in DailyReport document
   */
  @Field(() => DailyReportClass)
  @prop({ ref: () => DailyReportClass })
  public dailyReport!: Ref<DailyReportClass>;
}
