import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";
import {
  CrewFullSnippetFragment,
  EmployeeCardSnippetFragment,
  useCrewRemoveEmployeeMutation,
} from "../../../../../generated/graphql";
import createLink from "../../../../../utils/createLink";
import TextLink from "../../../../Common/TextLink";

interface IEmployeeCard {
  employee: EmployeeCardSnippetFragment;
  crew: CrewFullSnippetFragment;
}

const EmployeeCard = ({ employee, crew }: IEmployeeCard) => {
  const [remove, { loading: removeLoading }] = useCrewRemoveEmployeeMutation({
    variables: {
      crewId: crew._id,
      employeeId: employee._id,
    },
  });

  return (
    <Box p={2} w="100%" border="1px solid lightgray">
      <Flex flexDir="row" justifyContent="space-between">
        <Box>
          <TextLink link={createLink.employee(employee._id)} fontWeight="bold">
            {employee.name}
          </TextLink>
          <Text>{employee.jobTitle}</Text>
        </Box>
        <IconButton
          onClick={() => window.confirm("Are you sure?") && remove()}
          isLoading={removeLoading}
          backgroundColor="transparent"
          aria-label="remove"
          icon={<FiTrash />}
        />
      </Flex>
    </Box>
  );
};

export default EmployeeCard;
