import SchemaVersions from "@constants/SchemaVersions";
import { prop, Ref } from "@typegoose/typegoose";
import { MaterialClass, CompanyClass } from "@models";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class JobsiteMaterialSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => MaterialClass, { nullable: false })
  @prop({ ref: () => MaterialClass, required: true })
  public material!: Ref<MaterialClass>;

  @Field(() => CompanyClass, { nullable: false })
  @prop({ ref: () => CompanyClass, required: true })
  public supplier!: Ref<CompanyClass>;

  @Field({ nullable: false })
  @prop({ required: true })
  public quantity!: number;

  @Field({ nullable: false })
  @prop({ required: true })
  public unit!: string;

  @Field({ nullable: false })
  @prop({ required: true })
  public rate!: number;

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now })
  public createdAt!: Date;

  @Field()
  @prop({ required: true, default: SchemaVersions.JobsiteMaterial })
  public schemaVersion!: number;
}
