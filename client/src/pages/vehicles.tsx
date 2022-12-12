import { Box, Center, Flex } from "@chakra-ui/react";
import React from "react";
import Breadcrumbs from "../components/Common/Breadcrumbs";
import Container from "../components/Common/Container";
import InfiniteScroll from "../components/Common/InfiniteScroll";
import Loading from "../components/Common/Loading";
import VehicleCard from "../components/Common/Vehicle/Card";
import { useVehiclesQuery } from "../generated/graphql";

const Vehicles = () => {
  /**
   * ----- Hook Initialization -----
   */

  const { data, loading, fetchMore, networkStatus } = useVehiclesQuery({
    notifyOnNetworkStatusChange: true,
  });

  const [finished, setFinished] = React.useState(false);

  /**
   * ----- Functions -----
   */

  const nextPage = React.useCallback(() => {
    if (!finished && networkStatus === 7) {
      fetchMore({
        variables: {
          options: {
            offset: data?.vehicles.length,
          },
        },
      }).then((data) => {
        if (data.data.vehicles.length === 0) setFinished(true);
      });
    }
  }, [data?.vehicles.length, fetchMore, finished, networkStatus]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (data?.vehicles) {
      return (
        <Box>
          <Breadcrumbs
            crumbs={[
              {
                title: "Vehicles",
                isCurrentPage: true,
              },
            ]}
          />
          <Flex flexDir="column" alignContent="center" id="pages-flex">
            {data.vehicles.map((vehicle) => (
              <VehicleCard vehicle={vehicle} key={vehicle._id} />
            ))}
            {loading && (
              <Center pt={4}>
                <Loading />
              </Center>
            )}
          </Flex>
        </Box>
      );
    } else {
      return <Loading />;
    }
  }, [data?.vehicles, loading]);

  return (
    <Container>
      <InfiniteScroll
        enabled={!!data?.vehicles && data.vehicles.length > 0}
        loading={networkStatus !== 7}
        content={content}
        nextPage={nextPage}
      />
    </Container>
  );
};

export default Vehicles;
