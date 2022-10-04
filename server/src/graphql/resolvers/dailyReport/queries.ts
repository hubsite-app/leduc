import { DailyReportListFilter } from "@typescript/dailyReport";
import { ListOptionData } from "@typescript/graphql";
import { Field, InputType } from "type-graphql";

@InputType()
export class DailyReportListOptionData extends ListOptionData {
  @Field(() => [String], { nullable: true })
  public crews?: string[];

  @Field(() => [DailyReportListFilter], { nullable: true })
  public filters?: DailyReportListFilter[];
}
