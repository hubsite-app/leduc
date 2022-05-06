import { Box, Center, Flex } from "@chakra-ui/react";
import React from "react";
import Breadcrumbs from "../components/Common/Breadcrumbs";
import Container from "../components/Common/Container";
import DailyReportCard from "../components/Common/DailyReport/DailyReportCard";
import InfiniteScroll from "../components/Common/InfiniteScroll";
import Loading from "../components/Common/Loading";
import { useAuth } from "../contexts/Auth";
import { useDailyReportsLazyQuery, UserRoles } from "../generated/graphql";

const DailyReports = () => {
  /**
   * ----- Hook Initialization -----
   */

  const {
    state: { user },
  } = useAuth();

  const crews = React.useMemo(() => {
    if (user) {
      if (user.role === UserRoles.User) {
        return user.employee.crews.map((crew) => crew._id);
      } else return [];
    }
  }, [user]);

  const [fetch, { data, loading, fetchMore }] = useDailyReportsLazyQuery({
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
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (crews)
      fetch({
        variables: {
          options: {
            crews,
          },
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crews]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (data?.dailyReports) {
      return (
        <Box>
          <Breadcrumbs
            crumbs={[
              {
                title: "Daily Reports",
                isCurrentPage: true,
              },
            ]}
          />
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
                <Loading />
              </Center>
            )}
          </Flex>
        </Box>
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

export default DailyReports;
