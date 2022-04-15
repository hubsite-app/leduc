import { registerEnumType } from "type-graphql";

export enum PubSubTopics {
  JOBSITE_MONTH_REPORT = "JOBSITE_MONTH_REPORT",
}

registerEnumType(PubSubTopics, {
  name: "PubSubTopics",
});
