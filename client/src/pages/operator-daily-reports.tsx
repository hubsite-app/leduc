import { Box, Center, Flex } from "@chakra-ui/react";
import React from "react";
import Breadcrumbs from "../components/Common/Breadcrumbs";
import Container from "../components/Common/Container";
import InfiniteScroll from "../components/Common/InfiniteScroll";
import Loading from "../components/Common/Loading";
import OperatorDailyReportCard from "../components/Common/OperatorDailyReport/OperatorDailyReportCard";
import { useOperatorDailyReportsLazyQuery } from "../generated/graphql";

const OperatorDailyReports = () => {
  /**
   * --- Hook Initialization ---
   */

  const [fetch, { data, loading, fetchMore, networkStatus }] =
    useOperatorDailyReportsLazyQuery({
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
            offset: data?.operatorDailyReports.length,
          },
        },
      }).then((data) => {
        if (data.data.operatorDailyReports.length === 0) setFinished(true);
      });
    }
  }, [data?.operatorDailyReports.length, fetchMore, finished, networkStatus]);

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
    if (data?.operatorDailyReports) {
      return (
        <Box>
          <Flex flexDir="row" justifyContent="space-between">
            <Breadcrumbs
              crumbs={[
                {
                  title: "Operator Daily Reports",
                  isCurrentPage: true,
                },
              ]}
            />
          </Flex>
          <Flex flexDir="column" alignContent="center" id="pages-flex">
            {data.operatorDailyReports.map((operatorDailyReport) => {
              return (
                <OperatorDailyReportCard
                  operatorDailyReport={operatorDailyReport}
                  key={operatorDailyReport._id}
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
  }, [data?.operatorDailyReports, loading]);

  return (
    <Container>
      <InfiniteScroll
        enabled={
          !!data?.operatorDailyReports && data.operatorDailyReports.length > 0
        }
        loading={networkStatus !== 7}
        content={content}
        nextPage={() => nextPage()}
      />
    </Container>
  );
};

export default OperatorDailyReports;
