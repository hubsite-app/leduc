import { CrewClass, UserClass } from "@models";
import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class EmployeeSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field({ nullable: false })
  @prop({ required: true, minlength: 2, trim: true, unique: true })
  public name!: string;

  @Field({ nullable: true })
  @prop({ trim: true })
  public jobTitle?: string;

  /**
   * @deprecated user will hold link to employee
   */
  @Field(() => UserClass)
  @prop({ ref: () => UserClass })
  public user?: Ref<UserClass>;

  /**
   * @deprecated crews hold the link to an employee
   */
  @Field(() => [CrewClass])
  @prop({ ref: () => CrewClass })
  public crews!: Ref<CrewClass>[];
}
