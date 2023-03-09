import { registerEnumType } from "type-graphql";
import { Id } from "./models";

export interface IVehicleIssueCreate {
  title: string;
  description: string;
  priority: VehicleIssuePriority;
  assignedTo?: Id;
  operatorDailyReport?: Id;
}

export enum VehicleIssuePriority {
  P0 = "P0",
  P1 = "P1",
  P2 = "P2",
}

registerEnumType(VehicleIssuePriority, {
  name: "VehicleIssuePriority",
});
