import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../../../../contexts/Auth";
import Card from "../../../Common/Card";
import createLink from "../../../../utils/createLink";
import TextLink from "../../../Common/TextLink";
import Loading from "../../../Common/Loading";

const ProfileSettings = () => {
  const {
    state: { user },
  } = useAuth();

  return React.useMemo(() => {
    if (user) {
      return (
        <Box>
          <Heading>{user.name}</Heading>
          <Card heading={<Text fontWeight="bold">Employee</Text>}>
            <TextLink link={createLink.employee(user.employee._id)}>
              {user.employee.name}
              {!!user.employee.jobTitle && <> - {user.employee.jobTitle}</>}
            </TextLink>
          </Card>
        </Box>
      );
    } else {
      return <Loading />;
    }
  }, [user]);
};

export default ProfileSettings;
