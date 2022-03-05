import SchemaVersions from "@constants/SchemaVersions";
import { EmployeeClass } from "@models";
import { prop, Ref } from "@typegoose/typegoose";
import isEmail from "@validation/isEmail";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class UserSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field({ nullable: false })
  @prop({ required: true, minlength: 1, trim: true })
  public name!: string;

  @Field({ nullable: false })
  @prop({
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (value) => isEmail(value),
      message: "Provided email address is invalid",
    },
  })
  public email!: string;

  @Field({ nullable: false })
  @prop({ required: true })
  public password!: string;

  @Field()
  @prop()
  public resetPasswordToken?: string;

  @Field()
  @prop()
  public resetPasswordExpires?: Date;

  @Field({ nullable: false })
  @prop({ required: true, default: false })
  public admin!: boolean;

  @Field({ nullable: false })
  @prop({ required: true, default: false })
  public projectManager!: boolean;

  @Field(() => EmployeeClass, { nullable: false })
  @prop({ ref: () => EmployeeClass, required: true })
  public employee!: Ref<EmployeeClass>;

  @Field()
  @prop({ required: true, default: SchemaVersions.User })
  public schemaVersion!: number;
}
