import SchemaVersions from "@constants/SchemaVersions";
import { ES_updateVehicle } from "@elasticsearch/helpers/vehicle";
import { CrewClass, VehicleDocument } from "@models";
import { post, prop, Ref } from "@typegoose/typegoose";
import { Rate } from "@typescript/models";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@post<VehicleDocument>("save", async (vehicle) => {
  await ES_updateVehicle(vehicle);
})
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

  @Field(() => [Rate], { nullable: false })
  @prop({ type: () => [Rate], default: [], required: true })
  public rates!: Rate[];

  @Field()
  @prop({ required: true, default: SchemaVersions.Vehicle })
  public schemaVersion!: number;

  /**
   * @deprecated don't need bidirection link, crew already holds vehicle link
   */
  @Field(() => [CrewClass])
  @prop({ ref: () => CrewClass })
  public crews!: Ref<CrewClass>[];
}
