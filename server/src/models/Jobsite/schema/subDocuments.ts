import { prop } from "@typegoose/typegoose";
import { TruckingRateTypes } from "@typescript/jobsite";
import { DefaultRateClass } from "@typescript/models";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TruckingRateClass extends DefaultRateClass {
  @Field({ nullable: false })
  @prop({
    enum: TruckingRateTypes,
    required: true,
    default: TruckingRateTypes.Hour,
  })
  public type!: TruckingRateTypes;
}
