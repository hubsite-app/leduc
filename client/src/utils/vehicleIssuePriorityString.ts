import { VehicleIssuePriority } from "../generated/graphql";

export default function vehicleIssuePriorityString(
  priority: VehicleIssuePriority
) {
  switch (priority) {
    case VehicleIssuePriority.P0:
      return "PO - Vehicle Down";
    case VehicleIssuePriority.P1:
      return "P1 - Service Required";
    case VehicleIssuePriority.P2:
      return "P2 - Minor Issue";
  }
}
