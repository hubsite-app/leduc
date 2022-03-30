import React from "react";

import { Flex, Heading } from "@chakra-ui/react";
import { useCompaniesQuery } from "../../../generated/graphql";
import Card from "../Card";
import InfiniteScroll from "../InfiniteScroll";
import Loading from "../Loading";

const CompanyFullList = () => {
  /**
   * ----- Hook Initialization -----
   */

  const { data, loading, fetchMore } = useCompaniesQuery();

  const [finished, setFinished] = React.useState(false);

  /**
   * ----- Functions -----
   */

  const nextPage = React.useCallback(() => {
    if (!finished && !loading) {
      fetchMore({
        variables: {
          options: {
            offset: data?.companies.length,
          },
        },
      }).then((data) => {
        if (data.data.companies.length === 0) setFinished(true);
      });
    }
  }, [data?.companies.length, fetchMore, finished, loading]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (data?.companies) {
      return (
        <Flex flexDir="column" alignContent="center">
          {data.companies.map((company) => (
            <Card key={company._id}>
              <Heading size="md">{company.name}</Heading>
            </Card>
          ))}
          {loading && <Loading />}
        </Flex>
      );
    } else {
      return <Loading />;
    }
  }, [data?.companies, loading]);

  return <InfiniteScroll content={content} nextPage={nextPage} />;
};

export default CompanyFullList;
