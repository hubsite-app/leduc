import React from "react";
import { Tag } from "@chakra-ui/react";
import { VehicleIssuePriority } from "../../../generated/graphql";
import vehicleIssuePriorityString from "../../../utils/vehicleIssuePriorityString";

interface IVehicleIssuePriorityTag {
  priority: VehicleIssuePriority;
}

const VehicleIssuePriorityTag = ({ priority }: IVehicleIssuePriorityTag) => {
  /**
   * --- Variables ---
   */

  const color = React.useMemo(() => {
    switch (priority) {
      case VehicleIssuePriority.P0:
        return "red";
      case VehicleIssuePriority.P1:
        return "orange";
      case VehicleIssuePriority.P2:
        return "gray";
    }
  }, [priority]);

  /**
   * --- Rendering ---
   */

  return (
    <Tag variant="solid" colorScheme={color}>
      {vehicleIssuePriorityString(priority)}
    </Tag>
  );
};

export default VehicleIssuePriorityTag;
