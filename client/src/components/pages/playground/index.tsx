import React from "react";
import { useCompaniesQuery } from "../../../generated/graphql";
import Container from "../../Common/Container";
import TextDropdown, { IOptions } from "../../Common/forms/TextDropdown";

const PlaygroundClientOnly = () => {
  /**
   * ----- Hook Initialization -----
   */

  const { data } = useCompaniesQuery();

  const [fullOptions, setFullOptions] = React.useState<IOptions<{}>[]>([]);

  const [options, setOptions] = React.useState<IOptions<{}>[]>([]);

  const [searchString, setSearchString] = React.useState("");

  const [searchTimeout, setSearchTimeout] = React.useState<NodeJS.Timeout>();

  /**
   * ----- Functions -----
   */

  const setDefaultOptions = React.useCallback(() => {
    if (data?.companies) {
      setOptions(
        data.companies.map((company) => {
          return {
            label: company.name,
            value: company._id,
          };
        })
      );
    }
  }, [data?.companies]);

  const filterOptions = React.useCallback(
    (searchString: string) => {
      const fullOptionsCopy: IOptions<{}>[] = JSON.parse(
        JSON.stringify(fullOptions)
      );
      setOptions(
        fullOptionsCopy.filter((option) =>
          option.label.toLowerCase().match(searchString.toLowerCase())
        )
      );
    },
    [fullOptions]
  );

  const handleChange = React.useCallback(
    (value: string) => {
      setSearchString(value);
      if (searchTimeout) clearTimeout(searchTimeout);
      if (value !== "") {
        setSearchTimeout(
          setTimeout(() => {
            filterOptions(searchString);
          }, 500)
        );
      } else setDefaultOptions();
    },
    [filterOptions, searchString, searchTimeout, setDefaultOptions]
  );

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (data?.companies) {
      setDefaultOptions();
      setFullOptions(
        data.companies.map((company) => {
          return {
            label: company.name,
            value: company._id,
          };
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  /**
   * ----- Rendering -----
   */

  return (
    <Container>
      <TextDropdown
        placeholder="Pick Company"
        autoComplete="off"
        options={options}
        onOptionSelection={(option) => {}}
        onChange={(e) => handleChange(e.target.value)}
      />
    </Container>
  );
};

export default PlaygroundClientOnly;
