import React from "react";

import { Box, Button, Heading, Text } from "@chakra-ui/react";
import {
  EmployeeFullDocument,
  useEmployeeFullQuery,
  useSignupCreateMutation,
} from "../../../generated/graphql";
import Loading from "../../Common/Loading";
import Card from "../../Common/Card";
import TextLink from "../../Common/TextLink";
import CopyField from "../../Common/CopyField";
import EmployeeRates from "./views/Rates";
import createLink from "../../../utils/createLink";
import Permission from "../../Common/Permission";
import UserUpdateRole from "../../Forms/User/Role";

interface IEmployeeClientContent {
  id: string;
}

const EmployeeClientContent = ({ id }: IEmployeeClientContent) => {
  /**
   * ----- Hook Initialization -----
   */

  const { data } = useEmployeeFullQuery({
    variables: {
      id,
    },
  });

  const [createSignup, { loading: signupLoading }] = useSignupCreateMutation({
    refetchQueries: [EmployeeFullDocument],
  });

  /**
   * ----- Rendering -----
   */

  return React.useMemo(() => {
    if (data?.employee) {
      const employee = data.employee;

      let userContent;
      if (!employee.user) {
        if (employee.signup) {
          userContent = (
            <CopyField
              label="Signup Link"
              link={`${window.location.origin}/signup?id=${data?.employee.signup?._id}`}
            />
          );
        } else {
          userContent = (
            <Box>
              <Button
                onClick={() =>
                  createSignup({ variables: { employeeId: employee._id } })
                }
                isLoading={signupLoading}
              >
                Create Signup Link
              </Button>
            </Box>
          );
        }
      } else {
        userContent = (
          <Box>
            <Text>
              <Text fontWeight="bold" as="span">
                Name:{" "}
              </Text>
              {employee.user.name}
            </Text>
            <Text>
              <Text fontWeight="bold" as="span">
                Email:{" "}
              </Text>
              {employee.user.email}
            </Text>
            <Permission>
              <UserUpdateRole user={employee.user} />
            </Permission>
          </Box>
        );
      }

      return (
        <Box>
          <Card>
            <Heading size="md">User Info</Heading>
            {userContent}
          </Card>
          <Permission>
            <EmployeeRates employee={employee} />
          </Permission>
          {employee.crews.length > 0 && (
            <Card>
              <Heading size="md">Crews</Heading>
              <Box m={2}>
                {employee.crews.map((crew) => (
                  <Box key={crew._id} border="1px solid lightgray" p={2}>
                    <TextLink
                      fontWeight="bold"
                      link={createLink.crew(crew._id)}
                    >
                      {crew.name}
                    </TextLink>
                  </Box>
                ))}
              </Box>
            </Card>
          )}
        </Box>
      );
    } else return <Loading />;
  }, [createSignup, data?.employee, signupLoading]);
};

export default EmployeeClientContent;
