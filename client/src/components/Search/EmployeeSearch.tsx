import React from "react";
import {
  EmployeeCardSnippetFragment,
  useEmployeeSearchLazyQuery,
} from "../../generated/graphql";
import TextDropdown from "../Common/forms/TextDropdown";

import { ITextField } from "../Common/forms/TextField";

interface IEmployeeSearch extends ITextField {
  employeeSelected: (crew: { _id: string }) => void;
  handleSubmit?: (name: string) => void;
  blacklistedIds?: string[];
}

const EmployeeSearch = ({
  employeeSelected,
  handleSubmit,
  blacklistedIds,
  ...props
}: IEmployeeSearch) => {
  /**
   * ----- Hook Initialization -----
   */

  const [foundEmployees, setFoundEmployees] = React.useState<
    EmployeeCardSnippetFragment[]
  >([]);

  const [searchString, setSearchString] = React.useState(
    props.defaultValue?.toString() || ""
  );

  const [searchTimeout, setSearchTimeout] = React.useState<NodeJS.Timeout>();

  const [search, { loading, data }] = useEmployeeSearchLazyQuery();

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
    } else setFoundEmployees([]);
  };

  /**
   * ----- Variables -----
   */

  const options = React.useMemo(() => {
    return foundEmployees.map((employee) => {
      return {
        label: employee.name,
        value: employee._id,
      };
    });
  }, [foundEmployees]);

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (!loading && data) {
      setFoundEmployees(data.employeeSearch);
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
      placeholder="Search Employees"
      onOptionSelection={(value) => {
        setSearchString(value.label);
        employeeSelected({
          _id: value.value,
        });
        setFoundEmployees([]);
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

export default EmployeeSearch;
