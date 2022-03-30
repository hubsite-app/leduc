import React from "react";
import {
  MaterialCardSnippetFragment,
  useMaterialSearchLazyQuery,
} from "../../generated/graphql";
import TextDropdown from "../Common/forms/TextDropdown";

import { ITextField } from "../Common/forms/TextField";

interface IMaterialSearch extends ITextField {
  materialSelected: (crew: { _id: string; name: string }) => void;
  handleSubmit?: (name: string) => void;
  blacklistedIds?: string[];
}

const MaterialSearch = ({
  materialSelected,
  handleSubmit,
  blacklistedIds,
  onChange,
  ...props
}: IMaterialSearch) => {
  /**
   * ----- Hook Initialization -----
   */

  const [foundMaterials, setFoundMaterials] = React.useState<
    MaterialCardSnippetFragment[]
  >([]);

  const [searchString, setSearchString] = React.useState(
    props.defaultValue?.toString() || ""
  );

  const [searchTimeout, setSearchTimeout] = React.useState<NodeJS.Timeout>();

  const [search, { loading, data }] = useMaterialSearchLazyQuery();

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
    } else setFoundMaterials([]);
  };

  /**
   * ----- Variables -----
   */

  const options = React.useMemo(() => {
    return foundMaterials.map((material) => {
      return {
        label: material.name,
        value: material._id,
      };
    });
  }, [foundMaterials]);

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (!loading && data) {
      setFoundMaterials(data.materialSearch);
    }
  }, [loading, data]);

  /**
   * ----- Rendering -----
   */

  return (
    <TextDropdown
      onChange={(e) => {
        if (onChange) onChange(e);
        handleChange(e.target.value);
      }}
      options={options}
      placeholder="Search Materials"
      onOptionSelection={(value) => {
        setSearchString(value.label);
        materialSelected({
          _id: value.value,
          name: value.label,
        });
        setFoundMaterials([]);
      }}
      handleSubmit={() => {
        if (handleSubmit) handleSubmit(searchString);
      }}
      autoComplete="off"
      selectOptionsWithEnter
      {...props}
      value={searchString}
    />
  );
};

export default MaterialSearch;
