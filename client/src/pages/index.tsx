import { Center, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import Container from "../components/Common/Container";
import DailyReportCard from "../components/Common/DailyReportCard";
import InfiniteScroll from "../components/Common/InfiniteScroll";
import Loading from "../components/Common/Loading";

import { useDailyReportsQuery } from "../generated/graphql";

const Home = () => {
  /**
   * ----- Hook Initialization -----
   */

  const { data, loading, fetchMore } = useDailyReportsQuery();

  const [finished, setFinished] = React.useState(false);

  /**
   * ----- Functions -----
   */

  const nextPage = React.useCallback(() => {
    if (!finished && !loading) {
      fetchMore({
        variables: {
          options: {
            offset: data?.dailyReports.length,
          },
        },
      }).then((data) => {
        if (data.data.dailyReports.length === 0) setFinished(true);
      });
    }
  }, [data?.dailyReports.length, fetchMore, finished, loading]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (data?.dailyReports) {
      return (
        <Flex flexDir="column" alignContent="center" id="pages-flex">
          {data.dailyReports.map((dailyReport) => {
            return (
              <DailyReportCard
                dailyReport={dailyReport}
                key={dailyReport._id}
              />
            );
          })}
          {loading && (
            <Center pt={4}>
              <Spinner />
            </Center>
          )}
        </Flex>
      );
    } else {
      return <Loading />;
    }
  }, [data?.dailyReports, loading]);

  return (
    <Container>
      <InfiniteScroll content={content} nextPage={nextPage} />
    </Container>
  );
};

export default Home;
