import { Box, Center, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { FiDownload } from "react-icons/fi";
import Breadcrumbs from "../components/Common/Breadcrumbs";
import Container from "../components/Common/Container";
import InfiniteScroll from "../components/Common/InfiniteScroll";
import Loading from "../components/Common/Loading";
import TextLink from "../components/Common/TextLink";
import VehicleCard from "../components/Common/Vehicle/Card";
import { useVehiclesQuery } from "../generated/graphql";
import createLink from "../utils/createLink";

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
          <Flex w="100%" flexDir="row" justifyContent="space-between">
            <Breadcrumbs
              crumbs={[
                {
                  title: "Vehicles",
                  isCurrentPage: true,
                },
              ]}
            />
            <TextLink link={createLink.server_vehiclesExcelDownload()} newTab>
              <Icon
                cursor="pointer"
                as={FiDownload}
                backgroundColor="transparent"
              />
            </TextLink>
          </Flex>
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
