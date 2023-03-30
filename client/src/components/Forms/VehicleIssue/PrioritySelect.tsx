import React from "react";
import { VehicleIssuePriority } from "../../../generated/graphql";
import vehicleIssuePriorityString from "../../../utils/vehicleIssuePriorityString";

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
      options.push({
        title: vehicleIssuePriorityString(priority as VehicleIssuePriority),
        value: priority,
      });
    }

    return options;
  }, []);

  /**
   * ----- Rendering -----
   */

  return <Select placeholder={placeholder} options={options} {...props} />;
};

export default VehicleIssuePrioritySelect;
