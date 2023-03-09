import React from "react";
import { VehicleIssuePriority } from "../../../generated/graphql";

import Select, { ISelect } from "../../Common/forms/Select";

export interface IVehicleIssuePrioritySelect extends Omit<ISelect, "options"> { }

const VehicleIssuePrioritySelect = ({
  placeholder = "Select priority",
  ...props
}: IVehicleIssuePrioritySelect) => {
  /**
   * ----- Variables -----
   */

  const options: ISelect["options"] = React.useMemo(() => {
    const options: ISelect["options"] = [];

    for (let priority in VehicleIssuePriority) {
      switch (priority) {
        case VehicleIssuePriority.P0:
          options.push({ title: "PO - Vehicle Down", value: priority });
          break;
        case VehicleIssuePriority.P1:
          options.push({ title: "P1 - Service Required", value: priority });
          break;
        case VehicleIssuePriority.P2:
          options.push({ title: "P2 - Minor Issue", value: priority });
      }
    }

    return options;
  }, []);

  /**
   * ----- Rendering -----
   */

  return <Select placeholder={placeholder} options={options} {...props} />;
};

export default VehicleIssuePrioritySelect;
