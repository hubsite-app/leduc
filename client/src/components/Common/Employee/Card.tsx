import React from "react";
import { Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import {
  EmployeeCardSnippetFragment,
  EmployeesDocument,
  useEmployeeArchiveMutation,
  UserRoles,
} from "../../../generated/graphql";
import createLink from "../../../utils/createLink";
import Card from "../Card";
import TextGrid from "../TextGrid";
import TextLink from "../TextLink";
import Permission from "../Permission";
import { FiArchive } from "react-icons/fi";

interface IEmployeeCard {
  employee: EmployeeCardSnippetFragment;
}

const EmployeeCard = ({ employee }: IEmployeeCard) => {
  /**
   * ----- Hook Initialization -----
   */

  const [archive, { loading: archiveLoading, data }] =
    useEmployeeArchiveMutation({
      refetchQueries: [EmployeesDocument],
    });

  /**
   * ----- Rendering -----
   */

  return (
    <Card
      filter={data?.employeeArchive._id ? "blur(3px)" : ""}
      heading={
        <Flex flexDir="row" justifyContent="space-between">
          <TextLink
            link={createLink.employee(employee._id)}
            color="black"
            fontWeight="bold"
            fontSize="lg"
          >
            {employee.name}
          </TextLink>
          <Permission minRole={UserRoles.Admin}>
            <Flex flexDir="row">
              <Tooltip label="Archive">
                <IconButton
                  aria-label="archive"
                  backgroundColor="transparent"
                  icon={<FiArchive />}
                  isLoading={archiveLoading}
                  onClick={() => {
                    if (window.confirm("Are you sure?"))
                      archive({
                        variables: {
                          id: employee._id,
                        },
                      });
                  }}
                />
              </Tooltip>
            </Flex>
          </Permission>
        </Flex>
      }
    >
      <TextGrid
        rows={[
          {
            title: <Text fontWeight="bold">Job Title: </Text>,
            text: employee.jobTitle,
          },
        ]}
      />
    </Card>
  );
};

export default EmployeeCard;
