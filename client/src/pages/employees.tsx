import { Box, Center, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { FiDownload } from "react-icons/fi";
import Breadcrumbs from "../components/Common/Breadcrumbs";
import Container from "../components/Common/Container";
import EmployeeCard from "../components/Common/Employee/Card";
import InfiniteScroll from "../components/Common/InfiniteScroll";
import Loading from "../components/Common/Loading";
import TextLink from "../components/Common/TextLink";
import { useEmployeesQuery } from "../generated/graphql";
import createLink from "../utils/createLink";

const Employees = () => {
  /**
   * ----- Hook Initialization -----
   */

  const { data, loading, fetchMore, networkStatus } = useEmployeesQuery({
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
            offset: data?.employees.length,
          },
        },
      }).then((data) => {
        if (data.data.employees.length === 0) setFinished(true);
      });
    }
  }, [data?.employees.length, fetchMore, finished, networkStatus]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (data?.employees) {
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
            <TextLink link={createLink.server_employeesExcelDownload()} newTab>
              <Icon
                cursor="pointer"
                as={FiDownload}
                backgroundColor="transparent"
              />
            </TextLink>
          </Flex>
          <Flex flexDir="column" alignContent="center" id="pages-flex">
            {data.employees.map((employee) => (
              <EmployeeCard employee={employee} key={employee._id} />
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
  }, [data?.employees, loading]);

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
