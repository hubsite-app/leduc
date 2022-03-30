import { prop } from "@typegoose/typegoose";
import { FilterQuery, Types } from "mongoose";
import { Field, ObjectType } from "type-graphql";

export interface GetByIDOptions {
  throwError?: boolean;
}

export interface IListOptions<Document> {
  offset?: number;
  pageLimit?: number;
  query?: FilterQuery<Document>;
}

export interface ISearchOptions {
  limit?: number;
  blacklistedIds?: string[];
}

export type Id = string | Types.ObjectId;

@ObjectType()
export class Rate {
  @Field({ nullable: false })
  @prop({ required: true })
  public date!: Date;

  @Field({ nullable: false })
  @prop({ required: true, min: 0 })
  public rate!: number;
}

export interface IRatesData {
  date: Date;
  rate: number;
}
