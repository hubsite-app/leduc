import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class VehicleObjectClass {
  @Field({ nullable: true })
  @prop({ trim: true })
  public source!: string;

  @Field({ nullable: true })
  @prop({ trim: true, default: "Truck" })
  public vehicleType?: string;

  @Field({ nullable: true })
  @prop({ trim: true })
  public vehicleCode?: string;
}
