import SchemaVersions from "@constants/SchemaVersions";
import { ES_updateJobsite } from "@elasticsearch/helpers/jobsite";
import { CrewClass, DailyReportClass, JobsiteDocument } from "@models";
import { post, prop, Ref } from "@typegoose/typegoose";
import isUrl from "@validation/isUrl";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@post<JobsiteDocument>("save", async (jobsite) => {
  await ES_updateJobsite(jobsite);
})
export class JobsiteSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field({ nullable: false })
  @prop({ required: true, minlength: 1, trim: true })
  public name!: string;

  @Field({ nullable: true })
  @prop({
    trim: true,
    validate: {
      validator: (value) => isUrl(value),
      message: "Provided URL is not a valid URL",
    },
  })
  public location_url?: string;

  @Field({ nullable: true })
  @prop({ trim: true })
  public description?: string;

  @Field({ nullable: true })
  @prop({ trim: true, unique: true })
  public jobcode?: string;

  @Field({ nullable: false })
  @prop({ default: false, required: true })
  public active!: boolean;

  @Field(() => [CrewClass])
  @prop({ ref: () => CrewClass, default: [] })
  public crews!: Ref<CrewClass>[];

  @Field()
  @prop({ required: true, default: SchemaVersions.Jobsite })
  public schemaVersion!: number;

  /**
   * @deprecated dailyReports holds the link to the jobsite
   */
  @Field(() => [DailyReportClass])
  @prop({ ref: () => DailyReportClass, default: [] })
  public dailyReports!: Ref<DailyReportClass>[];
}
