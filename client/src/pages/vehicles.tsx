import { Box, Button, Center, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { FiDownload } from "react-icons/fi";
import Breadcrumbs from "../components/Common/Breadcrumbs";
import Container from "../components/Common/Container";
import InfiniteScroll from "../components/Common/InfiniteScroll";
import Loading from "../components/Common/Loading";
import TextLink from "../components/Common/TextLink";
import VehicleCard from "../components/Common/Vehicle/Card";
import {
  useArchivedVehiclesQuery,
  useVehiclesQuery,
} from "../generated/graphql";
import createLink from "../utils/createLink";

const Vehicles = () => {
  /**
   * ----- Hook Initialization -----
   */

  const { data, loading, fetchMore, networkStatus } = useVehiclesQuery({
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: archivedData,
    loading: archivedLoading,
    fetchMore: archivedFetchMore,
    networkStatus: archivedNetworkStatus,
  } = useArchivedVehiclesQuery({
    notifyOnNetworkStatusChange: true,
  });

  const [finished, setFinished] = React.useState(false);
  const [archivedFinished, setArchivedFinished] = React.useState(false);

  const [archived, setArchived] = React.useState(false);

  /**
   * ----- Functions -----
   */

  const nextPage = React.useCallback(() => {
    if (!archived) {
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
    } else {
      if (!archivedFinished && archivedNetworkStatus === 7) {
        archivedFetchMore({
          variables: {
            options: {
              offset: archivedData?.archivedVehicles.length,
            },
          },
        }).then((data) => {
          if (data.data.archivedVehicles.length === 0)
            setArchivedFinished(true);
        });
      }
    }
  }, [
    archived,
    finished,
    networkStatus,
    fetchMore,
    data?.vehicles.length,
    archivedFinished,
    archivedNetworkStatus,
    archivedFetchMore,
    archivedData?.archivedVehicles.length,
  ]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (data?.vehicles || archivedData?.archivedVehicles) {
      let content;
      if (!archived && data?.vehicles) {
        console.log("archived");
        content = data.vehicles.map((vehicle) => (
          <VehicleCard vehicle={vehicle} key={vehicle._id} />
        ));
      } else if (archived && archivedData?.archivedVehicles) {
        console.log("unarchived");
        content = archivedData.archivedVehicles.map((vehicle) => (
          <VehicleCard vehicle={vehicle} key={vehicle._id} />
        ));
      } else {
        console.log("error");
      }

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
            <Flex flexDir="row" justifyContent="space-between">
              <Button
                onClick={() => setArchived(!archived)}
                mx="2"
                variant="link"
              >
                {archived ? "Hide Archived" : "Show Archived"}
              </Button>
              <TextLink link={createLink.server_vehiclesExcelDownload()} newTab>
                <Icon
                  cursor="pointer"
                  as={FiDownload}
                  backgroundColor="transparent"
                />
              </TextLink>
            </Flex>
          </Flex>
          <Flex flexDir="column" alignContent="center" id="pages-flex">
            {content}
            {loading || archivedLoading ? (
              <Center pt={4}>
                <Loading />
              </Center>
            ) : null}
          </Flex>
        </Box>
      );
    } else {
      return <Loading />;
    }
  }, [
    data?.vehicles,
    loading,
    archivedData?.archivedVehicles,
    archivedLoading,
    archived,
  ]);

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
