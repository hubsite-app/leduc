import { Field, InputType } from "type-graphql";

@InputType()
export class SearchOptions {
  @Field({ nullable: true })
  public limit?: number;

  @Field(() => [String], { nullable: true })
  public blacklistedIds?: string[];
}
