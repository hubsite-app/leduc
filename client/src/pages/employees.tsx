import { Box, Button, Center, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { FiDownload } from "react-icons/fi";
import Breadcrumbs from "../components/Common/Breadcrumbs";
import Container from "../components/Common/Container";
import EmployeeCard from "../components/Common/Employee/Card";
import InfiniteScroll from "../components/Common/InfiniteScroll";
import Loading from "../components/Common/Loading";
import TextLink from "../components/Common/TextLink";
import {
  useArchivedEmployeesQuery,
  useEmployeesQuery,
} from "../generated/graphql";
import createLink from "../utils/createLink";

const Employees = () => {
  /**
   * ----- Hook Initialization -----
   */

  const { data, loading, fetchMore, networkStatus } = useEmployeesQuery({
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: archivedData,
    loading: archivedLoading,
    fetchMore: archivedFetchMore,
    networkStatus: archivedNetworkStatus,
  } = useArchivedEmployeesQuery({
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
              offset: data?.employees.length,
            },
          },
        }).then((data) => {
          if (data.data.employees.length === 0) setFinished(true);
        });
      }
    } else {
      if (!archivedFinished && archivedNetworkStatus === 7) {
        archivedFetchMore({
          variables: {
            options: {
              offset: archivedData?.archivedEmployees.length,
            },
          },
        }).then((data) => {
          if (data.data.archivedEmployees.length === 0)
            setArchivedFinished(true);
        });
      }
    }
  }, [
    archived,
    finished,
    networkStatus,
    fetchMore,
    data?.employees.length,
    archivedFinished,
    archivedNetworkStatus,
    archivedFetchMore,
    archivedData?.archivedEmployees.length,
  ]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (data?.employees || archivedData?.archivedEmployees) {
      let content;
      if (!archived && data?.employees) {
        content = data.employees.map((employee) => (
          <EmployeeCard employee={employee} key={employee._id} />
        ));
      } else if (archived && archivedData?.archivedEmployees) {
        content = archivedData.archivedEmployees.map((employee) => (
          <EmployeeCard employee={employee} key={employee._id} />
        ));
      }

      return (
        <Box>
          <Flex w="100%" flexDir="row" justifyContent="space-between">
            <Breadcrumbs
              crumbs={[
                {
                  title: "Employees",
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
              <TextLink
                link={createLink.server_employeesExcelDownload()}
                newTab
              >
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
    archived,
    archivedData?.archivedEmployees,
    data?.employees,
    loading,
    archivedLoading,
  ]);

  return (
    <Container>
      <InfiniteScroll
        enabled={!!data?.employees && data.employees.length > 0}
        loading={networkStatus !== 7}
        content={content}
        nextPage={nextPage}
      />
    </Container>
  );
};

export default Employees;
