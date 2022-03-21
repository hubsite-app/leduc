import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import Card from "../components/Common/Card";
import Container from "../components/Common/Container";
import InfiniteScroll from "../components/Common/InfiniteScroll";
import Loading from "../components/Common/Loading";

import { useMaterialsQuery } from "../generated/graphql";

const Materials = () => {
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

  return (
    <Container>
      <Heading>Materials</Heading>
      <InfiniteScroll content={content} nextPage={nextPage} />
    </Container>
  );
};

export default Materials;
