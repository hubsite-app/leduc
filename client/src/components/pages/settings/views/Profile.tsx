import React from "react";
import { Box, BoxProps, Flex, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../../../../contexts/Auth";
import Card from "../../../Common/Card";
import createLink from "../../../../utils/createLink";
import TextLink from "../../../Common/TextLink";
import Loading from "../../../Common/Loading";
import ProprietaryIcon from "../../../Common/ProprietaryIcon";

const HomeViewBox = ({ ...props }: BoxProps) => {
  return (
    <Flex flexDir="column" backgroundColor="gray.200" borderRadius={4} p={2}>
      {props.children}
    </Flex>
  );
};

const ProfileSettings = () => {
  const {
    state: { user },
  } = useAuth();

  return React.useMemo(() => {
    if (user) {
      return (
        <Box>
          <Heading>{user.name}</Heading>
          <Card heading={<Heading size="md">Employee</Heading>}>
            <TextLink link={createLink.employee(user.employee._id)}>
              {user.employee.name}
              {!!user.employee.jobTitle && <> - {user.employee.jobTitle}</>}
            </TextLink>
          </Card>
          {/* <Card heading={<Heading size="md">Settings</Heading>}>
            <Text fontWeight="bold">Home View</Text>

            <Flex flexDir="row" justifyContent="space-evenly" w="100%">
              <HomeViewBox>
                <ProprietaryIcon />
                Daily Reports
              </HomeViewBox>
              <HomeViewBox>General Reports</HomeViewBox>
            </Flex>
          </Card> */}
        </Box>
      );
    } else {
      return <Loading />;
    }
  }, [user]);
};

export default ProfileSettings;
