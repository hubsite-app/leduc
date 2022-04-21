import SchemaVersions from "@constants/SchemaVersions";
import { post, prop, Ref } from "@typegoose/typegoose";
import { MaterialClass, CompanyClass, JobsiteMaterialDocument } from "@models";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { DefaultRateClass, RateClass } from "@typescript/models";
import { logger } from "@logger";

@ObjectType()
@post<JobsiteMaterialDocument>("save", async (jobsiteMaterial) => {
  try {
    await jobsiteMaterial.requestReportUpdate();
  } catch (e: any) {
    logger.error(`Jobsite Material post save error: ${e.message}`);
  }
})
@post<JobsiteMaterialDocument>("remove", async (jobsiteMaterial) => {
  try {
    await jobsiteMaterial.requestReportUpdate();
  } catch (e: any) {
    logger.error(`Jobsite Material post remove error: ${e.message}`);
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

  @Field(() => [RateClass], { nullable: false })
  @prop({
    type: () => [RateClass],
    required: true,
    default: [],
  })
  public rates!: RateClass[];

  @Field({ nullable: false })
  @prop({ required: true, default: false })
  public delivered!: Boolean;

  @Field(() => [DefaultRateClass], { nullable: false })
  @prop({ type: () => [DefaultRateClass], required: true, default: [] })
  public deliveredRates!: DefaultRateClass[];

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now })
  public createdAt!: Date;

  @Field()
  @prop({ required: true, default: SchemaVersions.JobsiteMaterial })
  public schemaVersion!: number;
}
