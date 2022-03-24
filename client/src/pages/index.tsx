import { Center, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import Container from "../components/Common/Container";
import DailyReportCard from "../components/Common/DailyReportCard";
import InfiniteScroll from "../components/Common/InfiniteScroll";
import Loading from "../components/Common/Loading";
import { useAuth } from "../contexts/Auth";

import { useDailyReportsQuery } from "../generated/graphql";

const Home = () => {
  /**
   * ----- Hook Initialization -----
   */

  const {
    state: { user },
  } = useAuth();

  const crews = React.useMemo(() => {
    if (user && user.admin === false) {
      return user.employee.crews.map((crew) => crew._id);
    } else return [];
  }, [user]);

  const { data, loading, fetchMore } = useDailyReportsQuery({
    variables: {
      options: {
        crews,
      },
    },
  });

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
            crews,
          },
        },
      }).then((data) => {
        if (data.data.dailyReports.length === 0) setFinished(true);
      });
    }
  }, [crews, data?.dailyReports.length, fetchMore, finished, loading]);

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
