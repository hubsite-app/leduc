import { Field, Float, InputType } from "type-graphql";

@InputType()
export class RatesData {
  @Field({ nullable: false })
  public date!: Date;

  @Field(() => Float, { nullable: false })
  public rate!: number;
}
