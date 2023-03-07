import { Flex } from "@chakra-ui/react";
import Breadcrumbs from "../components/Common/Breadcrumbs";
import Container from "../components/Common/Container";

const OperatorDailyReports = () => {
  return (
    <Container>
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
    </Container>
  );
};

export default OperatorDailyReports;
