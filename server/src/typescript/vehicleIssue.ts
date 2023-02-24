import { registerEnumType } from "type-graphql";

export enum VehicleIssuePriority {
  P0 = "P0",
  P1 = "P1",
  P2 = "P2",
}

registerEnumType(VehicleIssuePriority, {
  name: "VehicleIssuePriority",
});
