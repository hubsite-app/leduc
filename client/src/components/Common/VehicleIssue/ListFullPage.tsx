import React from "react";

import { Box, Center, Flex } from "@chakra-ui/react";
import {
  useOperatorDailyReportsLazyQuery,
  useVehicleIssuesLazyQuery,
} from "../../../generated/graphql";
import Breadcrumbs from "../Breadcrumbs";
import InfiniteScroll from "../InfiniteScroll";
import Loading from "../Loading";
import VehicleIssueCard from "./Card";

interface IVehicleIssueFullPageList {
  hideBreadcrumbs?: boolean;
}

const VehicleIssueFullPageList = ({
  hideBreadcrumbs = false,
}: IVehicleIssueFullPageList) => {
  /**
   * --- Hook Initialization ---
   */

  const [fetch, { data, loading, fetchMore, networkStatus }] =
    useVehicleIssuesLazyQuery({
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
            offset: data?.vehicleIssues.length,
          },
        },
      }).then((data) => {
        if (data.data.vehicleIssues.length === 0) setFinished(true);
      });
    }
  }, [data?.vehicleIssues.length, fetchMore, finished, networkStatus]);

  /**
   * --- Lifecycle ---
   */

  React.useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * --- Rendering ---
   */

  const content = React.useMemo(() => {
    if (data?.vehicleIssues) {
      return (
        <Box>
          <Flex flexDir="row" justifyContent="space-between">
            <Box>
              {hideBreadcrumbs ? null : (
                <Breadcrumbs
                  crumbs={[
                    {
                      title: "Vehicle Issues",
                      isCurrentPage: true,
                    },
                  ]}
                />
              )}
            </Box>
          </Flex>
          <Flex flexDir="column" alignContent="center" id="pages-flex">
            {data.vehicleIssues.map((vehicleIssue) => {
              return (
                <VehicleIssueCard
                  vehicleIssue={vehicleIssue}
                  key={vehicleIssue._id}
                />
              );
            })}
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
  }, [data?.vehicleIssues, hideBreadcrumbs, loading]);

  return (
    <InfiniteScroll
      enabled={!!data?.vehicleIssues && data.vehicleIssues.length > 0}
      loading={networkStatus !== 7}
      content={content}
      nextPage={() => nextPage()}
    />
  );
};

export default VehicleIssueFullPageList;
