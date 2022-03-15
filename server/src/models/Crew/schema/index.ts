import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { post, prop, Ref } from "@typegoose/typegoose";
import { CrewTypes } from "@typescript/crew";
import {
  CrewDocument,
  EmployeeClass,
  JobsiteClass,
  VehicleClass,
} from "@models";
import SchemaVersions from "@constants/SchemaVersions";
import { ES_updateCrew } from "@elasticsearch/helpers/crew";

@ObjectType()
@post<CrewDocument>("save", async (crew) => {
  await ES_updateCrew(crew);
})
export class CrewSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field({ nullable: false })
  @prop({ required: true, minlength: 2, trim: true, unique: true })
  public name!: string;

  @Field({ nullable: false })
  @prop({ required: true })
  public type!: string;

  @Field(() => [EmployeeClass])
  @prop({ ref: () => EmployeeClass, default: [] })
  public employees!: Ref<EmployeeClass>[];

  @Field(() => [VehicleClass])
  @prop({ ref: () => VehicleClass, default: [] })
  public vehicles!: Ref<VehicleClass>[];

  @Field()
  @prop({ required: true, default: SchemaVersions.Crew })
  public schemaVersion!: number;

  /**
   * @deprecated jobsite holds the list of crews
   */
  @Field(() => [JobsiteClass])
  @prop({ ref: () => JobsiteClass })
  public jobsites!: Ref<JobsiteClass>[];
}
