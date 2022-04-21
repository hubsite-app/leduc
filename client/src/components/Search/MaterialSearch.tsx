import React from "react";
import {
  MaterialCardSnippetFragment,
  useMaterialCardLazyQuery,
  useMaterialSearchLazyQuery,
} from "../../generated/graphql";
import isObjectId from "../../utils/isObjectId";
import TextDropdown from "../Common/forms/TextDropdown";

import { ITextField } from "../Common/forms/TextField";

interface IMaterialSearch extends ITextField {
  materialSelected: (material: { _id: string; name: string }) => void;
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

  const [fetch, { loading: fetchLoading, data: fetchData }] =
    useMaterialCardLazyQuery();

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

  React.useEffect(() => {
    if (props.value && isObjectId(props.value.toString())) {
      fetch({
        variables: {
          id: props.value.toString(),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (fetchData?.material && !fetchLoading) {
      setSearchString(fetchData.material.name);
      materialSelected({
        _id: fetchData.material._id,
        name: fetchData.material.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, fetchLoading]);

  /**
   * ----- Rendering -----
   */

  return (
    <TextDropdown
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
      onChange={(e) => {
        if (onChange) onChange(e);
        handleChange(e.target.value);
      }}
      value={searchString}
    />
  );
};

export default MaterialSearch;
