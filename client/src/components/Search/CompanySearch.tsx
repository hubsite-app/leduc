import React from "react";
import {
  CompanyCardSnippetFragment,
  useCompanyCardLazyQuery,
  useCompanySearchLazyQuery,
} from "../../generated/graphql";
import isObjectId from "../../utils/isObjectId";
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

  const [fetch, { loading: fetchLoading, data: fetchData }] =
    useCompanyCardLazyQuery();

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
    if (props.value && !isObjectId(props.value.toString())) {
      setSearchString(props.value.toString());
    }
  }, [props.value]);

  React.useEffect(() => {
    if (fetchData?.company && !fetchLoading) {
      setSearchString(fetchData.company.name);
      companySelected({
        _id: fetchData.company._id,
        name: fetchData.company.name,
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
      onChange={(e) => {
        if (onChange) onChange(e);
        handleChange(e.target.value);
      }}
      value={searchString}
    />
  );
};

export default CompanySearch;
