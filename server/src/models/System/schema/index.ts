import { Types } from "mongoose";
import { prop } from "@typegoose/typegoose";
import { Field, Float, ID, ObjectType } from "type-graphql";
import SchemaVersions from "@constants/SchemaVersions";
import { DefaultRateClass } from "@typescript/models";

@ObjectType()
export class SystemSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => [String], { nullable: false })
  @prop({ type: () => [String], required: true, default: [] })
  public unitDefaults!: string[];

  @Field(() => [String], { nullable: false })
  @prop({ type: () => [String], required: true, default: [] })
  public laborTypes!: string[];

  @Field(() => [DefaultRateClass], { nullable: false })
  @prop({ type: () => [DefaultRateClass], required: true, default: [] })
  public companyVehicleTypeDefaults!: DefaultRateClass[];

  @Field(() => [DefaultRateClass], { nullable: false })
  @prop({ type: () => [DefaultRateClass], required: true, default: [] })
  public materialShipmentVehicleTypeDefaults!: DefaultRateClass[];

  @Field(() => Float, {
    nullable: false,
    description:
      "Percent overhead to be added to internal expenses when calculating total expenses",
  })
  @prop({ required: true, default: 10 })
  public internalExpenseOverheadRate!: number;

  @Field({ nullable: false })
  @prop({ required: true, default: "America/Edmonton" })
  public timezone!: string;

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now })
  public createdAt!: Date;

  @Field()
  @prop({ required: true, default: SchemaVersions.System })
  public schemaVersion!: number;
}
