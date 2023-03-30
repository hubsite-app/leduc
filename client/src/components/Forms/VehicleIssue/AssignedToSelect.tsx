import React from "react";
import { useMechanicsQuery } from "../../../generated/graphql";

import Select, { ISelect } from "../../Common/forms/Select";

export interface IVehicleIssueAssignedToSelect
  extends Omit<ISelect, "options"> { }

const VehicleIssueAssignedToSelect = ({
  placeholder = "Unassigned",
  ...props
}: IVehicleIssueAssignedToSelect) => {
  /**
   * --- Hook Initialization ---
   */

  const { data, loading } = useMechanicsQuery();

  /**
   * ----- Variables -----
   */

  const options: ISelect["options"] = React.useMemo(() => {
    const options: ISelect["options"] = [];

    if (data?.mechanics) {
      const mechanics = data.mechanics;
      for (let i = 0; i < mechanics.length; i++) {
        options.push({
          title: mechanics[i].name,
          value: mechanics[i]._id,
        });
      }
    }

    return options;
  }, [data?.mechanics]);

  /**
   * ----- Rendering -----
   */

  return (
    <Select
      variant="flushed"
      placeholder={placeholder}
      options={options}
      {...props}
      isDisabled={props.isDisabled || loading}
    />
  );
};

export default VehicleIssueAssignedToSelect;
