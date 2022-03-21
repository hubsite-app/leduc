import { ES_updateMaterial } from "@elasticsearch/helpers/material";
import { MaterialDocument } from "@models";
import { post, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@post<MaterialDocument>("save", async (material) => {
  await ES_updateMaterial(material);
})
export class MaterialSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field({ nullable: false })
  @prop({
    required: true,
    trim: true,
    immutable: true,
    unique: true,
  })
  public name!: string;

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now })
  public createdAt!: Date;
}
