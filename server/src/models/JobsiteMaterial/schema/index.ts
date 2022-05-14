import SchemaVersions from "@constants/SchemaVersions";
import { post, prop, Ref } from "@typegoose/typegoose";
import { MaterialClass, CompanyClass, JobsiteMaterialDocument } from "@models";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import errorHandler from "@utils/errorHandler";
import {
  JobsiteMaterialDeliveredRateClass,
  JobsiteMaterialRateClass,
} from "@typescript/jobsiteMaterial";

@ObjectType()
@post<JobsiteMaterialDocument>("save", async (jobsiteMaterial) => {
  try {
    await jobsiteMaterial.requestReportUpdate();
  } catch (e) {
    errorHandler("Jobsite Material post save error", e);
  }
})
@post<JobsiteMaterialDocument>("remove", async (jobsiteMaterial) => {
  try {
    await jobsiteMaterial.requestReportUpdate();
  } catch (e) {
    errorHandler("Jobsite Material post remove error", e);
  }
})
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

  @Field(() => [JobsiteMaterialRateClass], { nullable: false })
  @prop({
    type: () => [JobsiteMaterialRateClass],
    required: true,
    default: [],
  })
  public rates!: JobsiteMaterialRateClass[];

  @Field({ nullable: false })
  @prop({ required: true, default: false })
  public delivered!: boolean;

  @Field(() => [JobsiteMaterialDeliveredRateClass], { nullable: false })
  @prop({
    type: () => [JobsiteMaterialDeliveredRateClass],
    required: true,
    default: [],
  })
  public deliveredRates!: JobsiteMaterialDeliveredRateClass[];

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now })
  public createdAt!: Date;

  @Field()
  @prop({ required: true, default: SchemaVersions.JobsiteMaterial })
  public schemaVersion!: number;
}
