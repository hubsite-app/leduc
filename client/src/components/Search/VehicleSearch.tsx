import React from "react";
import {
  VehicleCardSnippetFragment,
  useVehicleSearchLazyQuery,
} from "../../generated/graphql";
import TextDropdown from "../Common/forms/TextDropdown";

import { ITextField } from "../Common/forms/TextField";

interface IVehicleSearch extends ITextField {
  vehicleSelected: (crew: { _id: string }) => void;
  handleSubmit?: (name: string) => void;
  blacklistedIds?: string[];
}

const VehicleSearch = ({
  vehicleSelected,
  handleSubmit,
  blacklistedIds,
  ...props
}: IVehicleSearch) => {
  /**
   * ----- Hook Initialization -----
   */

  const [foundVehicles, setFoundVehicles] = React.useState<
    VehicleCardSnippetFragment[]
  >([]);

  const [searchString, setSearchString] = React.useState(
    props.defaultValue?.toString() || ""
  );

  const [searchTimeout, setSearchTimeout] = React.useState<NodeJS.Timeout>();

  const [search, { loading, data }] = useVehicleSearchLazyQuery();

  /**
   * ----- Functions -----
   */

  const handleChange = (value: string) => {
    setSearchString(value);
    if (searchTimeout) clearTimeout(searchTimeout);
    if (value !== "") {
      setSearchTimeout(
        setTimeout(() => {
          search({
            variables: {
              searchString: value,
              options: {
                blacklistedIds,
              },
            },
          });
        }, 500)
      );
    } else setFoundVehicles([]);
  };

  /**
   * ----- Variables -----
   */

  const options = React.useMemo(() => {
    return foundVehicles.map((vehicle) => {
      return {
        label: `${vehicle.name} (${vehicle.vehicleCode}) - ${vehicle.vehicleType}`,
        value: vehicle._id,
      };
    });
  }, [foundVehicles]);

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (!loading && data) {
      setFoundVehicles(data.vehicleSearch);
    }
  }, [loading, data]);

  /**
   * ----- Rendering -----
   */

  return (
    <TextDropdown
      onChange={(e) => handleChange(e.target.value)}
      value={searchString}
      options={options}
      placeholder="Search vehicles"
      onOptionSelection={(value) => {
        setSearchString(value.label);
        vehicleSelected({
          _id: value.value,
        });
        setFoundVehicles([]);
      }}
      handleSubmit={() => {
        if (handleSubmit) handleSubmit(searchString);
      }}
      autoComplete="off"
      selectOptionsWithEnter
      {...props}
    />
  );
};

export default VehicleSearch;
