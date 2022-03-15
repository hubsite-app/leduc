import React from "react";
import {
  CrewCardSnippetFragment,
  useCrewSearchLazyQuery,
} from "../../generated/graphql";
import TextDropdown from "../Common/forms/TextDropdown";

import { ITextField } from "../Common/forms/TextField";

interface ICrewSearch extends ITextField {
  crewSelected: (crew: { _id: string }) => void;
  handleSubmit?: (name: string) => void;
  blacklistedIds?: string[];
}

const CrewSearch = ({
  crewSelected,
  handleSubmit,
  blacklistedIds,
  ...props
}: ICrewSearch) => {
  /**
   * ----- Hook Initialization -----
   */

  const [foundCrews, setFoundCrews] = React.useState<CrewCardSnippetFragment[]>(
    []
  );

  const [searchString, setSearchString] = React.useState(
    props.defaultValue?.toString() || ""
  );

  const [searchTimeout, setSearchTimeout] = React.useState<NodeJS.Timeout>();

  const [search, { loading, data }] = useCrewSearchLazyQuery();

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
    } else setFoundCrews([]);
  };

  /**
   * ----- Variables -----
   */

  const options = React.useMemo(() => {
    return foundCrews.map((crew) => {
      return {
        label: crew.name,
        value: crew._id,
      };
    });
  }, [foundCrews]);

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (!loading && data) {
      setFoundCrews(data.crewSearch);
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
      placeholder="Search Crews"
      onOptionSelection={(value) => {
        setSearchString(value.label);
        crewSelected({
          _id: value.value,
        });
        setFoundCrews([]);
      }}
      handleSubmit={() => {
        if (handleSubmit) handleSubmit(searchString);
      }}
      autoComplete="off"
      selectOptionsWithEnter
      isLoading={loading}
      {...props}
    />
  );
};

export default CrewSearch;
