import { CrewClass } from "@models";
import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class VehicleSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field({ nullable: false })
  @prop({ required: true, minlength: 2, trim: true })
  public name!: string;

  @Field({ nullable: false })
  @prop({ required: true, trim: true, default: "noCode" })
  public vehicleCode!: string;

  @Field({ nullable: false })
  @prop({ required: true, trim: true, default: "General" })
  public vehicleType!: string;

  @Field({ nullable: false })
  @prop({ required: true, default: false })
  public rental!: boolean;

  @Field({ nullable: false })
  @prop({ required: true, trim: true, minlength: 1, default: "Bow Mark" })
  public sourceCompany!: string;

  /**
   * @deprecated don't need bidirection link, crew already holds vehicle link
   */
  @Field(() => [CrewClass])
  @prop({ ref: () => CrewClass })
  public crews!: Ref<CrewClass>[];
}
