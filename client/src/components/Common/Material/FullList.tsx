import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

import { useMaterialsQuery } from "../../../generated/graphql";
import Card from "../Card";
import InfiniteScroll from "../InfiniteScroll";
import Loading from "../Loading";

const MaterialFullList = () => {
  /**
   * ----- Hook Initialization -----
   */

  const { data, loading, fetchMore } = useMaterialsQuery();

  const [finished, setFinished] = React.useState(false);

  /**
   * ----- Functions -----
   */

  const nextPage = React.useCallback(() => {
    if (!finished && !loading) {
      fetchMore({
        variables: {
          options: {
            offset: data?.materials.length,
          },
        },
      }).then((data) => {
        if (data.data.materials.length === 0) setFinished(true);
      });
    }
  }, [data?.materials.length, fetchMore, finished, loading]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (data?.materials) {
      return (
        <Flex flexDir="column" alignContent="center">
          {data.materials.map((material) => (
            <Card key={material._id}>
              <Heading size="md">{material.name}</Heading>
            </Card>
          ))}
          {loading && <Loading />}
        </Flex>
      );
    } else {
      return <Loading />;
    }
  }, [data?.materials, loading]);

  return <InfiniteScroll content={content} nextPage={nextPage} />;
};

export default MaterialFullList;
