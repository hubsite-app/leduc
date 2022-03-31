import React from "react";

import { Center, Flex, Heading, IconButton } from "@chakra-ui/react";
import {
  CrewFullSnippetFragment,
  EmployeeCardSnippetFragment,
} from "../../../../../generated/graphql";
import Card from "../../../../Common/Card";
import EmployeeCard from "./EmployeeCard";
import { FiPlus, FiX } from "react-icons/fi";
import EmployeeAddForm from "./EmployeeAddForm";
import ShowMore from "../../../../Common/ShowMore";

interface IEmployees {
  employees: EmployeeCardSnippetFragment[];
  crew: CrewFullSnippetFragment;
}

const Employees = ({ employees, crew }: IEmployees) => {
  /**
   * ----- Hook Initialization -----
   */

  const [addForm, setAddForm] = React.useState(false);

  /**
   * ----- Rendering -----
   */

  return (
    <Card>
      <Flex flexDir="row" justifyContent="space-between">
        <Heading ml={2} w="100%" my="auto" size="md">
          Employees ({employees.length})
        </Heading>
        <IconButton
          aria-label="add"
          backgroundColor="transparent"
          icon={addForm ? <FiX /> : <FiPlus />}
          onClick={() => setAddForm(!addForm)}
        />
      </Flex>
      {addForm && (
        <EmployeeAddForm crew={crew} closeForm={() => setAddForm(false)} />
      )}

      <Flex flexDir="column" w="100%" px={4} py={2}>
        {employees.length > 0 ? (
          <ShowMore
            list={employees.map((employee) => (
              <EmployeeCard
                employee={employee}
                crew={crew}
                key={employee._id}
              />
            ))}
          />
        ) : (
          <Center>No employees</Center>
        )}
      </Flex>
    </Card>
  );
};

export default Employees;
