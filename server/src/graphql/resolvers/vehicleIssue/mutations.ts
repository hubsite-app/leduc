import { UserDocument, Vehicle, VehicleIssue } from "@models";
import { Id } from "@typescript/models";
import { VehicleIssuePriority } from "@typescript/vehicleIssue";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class VehicleIssueCreateData {
  @Field()
  public title!: string;

  @Field()
  public description!: string;

  @Field(() => VehicleIssuePriority)
  public priority!: VehicleIssuePriority;

  @Field(() => ID, { nullable: true })
  public assignedTo?: Id;

  @Field(() => ID, { nullable: true })
  public operatorDailyReport?: Id;
}

const create = async (
  vehicleId: Id,
  author: UserDocument,
  data: VehicleIssueCreateData
) => {
  const vehicle = await Vehicle.getById(vehicleId);
  if (!vehicle) throw new Error("Unable to find this vehicle");

  const vehicleIssue = await VehicleIssue.createDocument(vehicle, author, data);
  await vehicleIssue.save();

  return vehicleIssue;
};

export default {
  create,
};
