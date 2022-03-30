import React from "react";
import {
  CompanyCardSnippetFragment,
  useCompanySearchLazyQuery,
} from "../../generated/graphql";
import TextDropdown from "../Common/forms/TextDropdown";

import { ITextField } from "../Common/forms/TextField";

interface ICompanySearch extends ITextField {
  companySelected: (crew: { _id: string; name: string }) => void;
  handleSubmit?: (name: string) => void;
  blacklistedIds?: string[];
}

const CompanySearch = ({
  companySelected,
  handleSubmit,
  blacklistedIds,
  onChange,
  ...props
}: ICompanySearch) => {
  /**
   * ----- Hook Initialization -----
   */

  const [foundCompanies, setFoundCompanies] = React.useState<
    CompanyCardSnippetFragment[]
  >([]);

  const [searchString, setSearchString] = React.useState(
    props.defaultValue?.toString() || ""
  );

  const [searchTimeout, setSearchTimeout] = React.useState<NodeJS.Timeout>();

  const [search, { loading, data }] = useCompanySearchLazyQuery();

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
    } else setFoundCompanies([]);
  };

  /**
   * ----- Variables -----
   */

  const options = React.useMemo(() => {
    return foundCompanies.map((company) => {
      return {
        label: company.name,
        value: company._id,
      };
    });
  }, [foundCompanies]);

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (!loading && data) {
      setFoundCompanies(data.companySearch);
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
      placeholder="Search Companies"
      onOptionSelection={(value) => {
        setSearchString(value.label);
        companySelected({
          _id: value.value,
          name: value.label,
        });
        setFoundCompanies([]);
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

export default CompanySearch;
