import { prop } from "@typegoose/typegoose";
import { UserHomeViewSettings } from "@typescript/user";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserSettings {
  @Field(() => UserHomeViewSettings, { nullable: false })
  @prop({
    required: true,
    enum: UserHomeViewSettings,
    default: UserHomeViewSettings.DailyReports,
  })
  public homeView!: UserHomeViewSettings;
}
