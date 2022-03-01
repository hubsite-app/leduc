import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Card from "../components/Common/Card";
import Container from "../components/Common/Container";
import Loading from "../components/Common/Loading";

import { useAuth } from "../contexts/Auth";

const Me = () => {
  const {
    state: { user },
  } = useAuth();

  const content = React.useMemo(() => {
    if (user) {
      return (
        <Box>
          <Heading>{user.name}</Heading>
          <Card heading={<Text fontWeight="bold">Employee</Text>}>
            <Text>
              {user.employee.name}
              {!!user.employee.jobTitle && <> - {user.employee.jobTitle}</>}
            </Text>
          </Card>
        </Box>
      );
    } else {
      return <Loading />;
    }
  }, [user]);

  return <Container>{content}</Container>;
};

export default Me;
