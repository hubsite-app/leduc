import { InvoiceClass } from "@models";
import { DocumentType, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, Float, ID, ObjectType } from "type-graphql";

@ObjectType()
export class InvoiceReportClass {
  @Field(() => ID, { nullable: false })
  public _id?: Types.ObjectId;

  @Field(() => InvoiceClass, { nullable: false })
  @prop({ ref: () => InvoiceClass, required: true })
  public invoice!: Ref<InvoiceClass>;

  @Field(() => Float, { nullable: false })
  @prop({ required: true })
  public value!: number;

  @Field(() => Boolean, { nullable: false })
  @prop({ required: true })
  public internal!: boolean;
}

export interface InvoiceReportDocument
  extends DocumentType<InvoiceReportClass> {}

@ObjectType()
export class MonthSummaryReportClass {
  @Field(() => ID, { nullable: false })
  public _id?: Types.ObjectId;

  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public externalExpenseInvoiceValue!: number;

  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public internalExpenseInvoiceValue!: number;

  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public externalRevenueInvoiceValue!: number;

  @Field(() => Float, { nullable: false })
  @prop({ required: true, default: 0 })
  public internalRevenueInvoiceValue!: number;
}
