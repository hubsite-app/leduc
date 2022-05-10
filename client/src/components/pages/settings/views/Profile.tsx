import React from "react";
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../../../../contexts/Auth";
import Card from "../../../Common/Card";
import createLink from "../../../../utils/createLink";
import TextLink from "../../../Common/TextLink";
import Loading from "../../../Common/Loading";
import {
  CurrentUserDocument,
  FullUserSnippetFragment,
  UserHomeViewSettings,
  UserRoles,
  useUserUpdateHomeViewMutation,
} from "../../../../generated/graphql";
import Permission from "../../../Common/Permission";

const HomeViewBox = ({
  user,
  value,
  isLoading,
  onChange,
  ...props
}: BoxProps & {
  user: FullUserSnippetFragment;
  value: UserHomeViewSettings;
  isLoading: boolean;
  onChange: (value: UserHomeViewSettings) => void;
}) => {
  /**
   * ----- Variables ----
   */

  const selected = React.useMemo(() => {
    return user.settings.homeView === value;
  }, [user.settings.homeView, value]);

  /**
   * ----- Rendering -----
   */

  return (
    <Flex
      flexDir="column"
      border="1px solid"
      borderColor={selected ? "gray.500" : "gray.200"}
      backgroundColor="gray.200"
      borderRadius={4}
      p={2}
      w="15%"
      cursor="pointer"
      _hover={{ borderColor: "gray.500" }}
      onClick={() => {
        if (!isLoading && !selected) onChange(value);
      }}
    >
      <Box backgroundColor="gray.100" borderRadius={4}>
        {props.children}
      </Box>
      <Flex justifyContent="center">
        <RadioGroup value={user.settings.homeView} mt={2}>
          <Radio value={value} backgroundColor="white" />
        </RadioGroup>
      </Flex>
    </Flex>
  );
};

const ProfileSettings = () => {
  /**
   * ----- Hook Initialization -----
   */

  const {
    state: { user },
  } = useAuth();

  const [updateHomeView, { loading }] = useUserUpdateHomeViewMutation({
    refetchQueries: [CurrentUserDocument],
  });

  /**
   * ----- Rendering -----
   */

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
          <Card heading={<Heading size="md">Settings</Heading>}>
            <Text fontWeight="bold">Home View</Text>

            <Flex flexDir="row" justifyContent="space-evenly" w="100%">
              <HomeViewBox
                isLoading={loading}
                user={user}
                value={UserHomeViewSettings.DailyReports}
                onChange={(value) => {
                  updateHomeView({
                    variables: {
                      homeView: value as UserHomeViewSettings,
                    },
                  });
                }}
              >
                <Text fontWeight="bold" textAlign="center" my={6}>
                  Daily Reports
                </Text>
              </HomeViewBox>
              <Permission minRole={UserRoles.ProjectManager}>
                <HomeViewBox
                  isLoading={loading}
                  user={user}
                  value={UserHomeViewSettings.GeneralReports}
                  onChange={(value) => {
                    updateHomeView({
                      variables: {
                        homeView: value as UserHomeViewSettings,
                      },
                    });
                  }}
                >
                  <Text fontWeight="bold" textAlign="center" my={6}>
                    Reports
                  </Text>
                </HomeViewBox>
              </Permission>
            </Flex>
          </Card>
        </Box>
      );
    } else {
      return <Loading />;
    }
  }, [loading, updateHomeView, user]);
};

export default ProfileSettings;
