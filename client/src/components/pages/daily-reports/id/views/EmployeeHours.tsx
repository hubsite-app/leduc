import React from "react";

import { Heading, Flex, IconButton, Box, Divider } from "@chakra-ui/react";

import EmployeeWorkCard from "./EmployeeWorkCard";
import Card from "../../../../Common/Card";

import { DailyReportFullSnippetFragment } from "../../../../../generated/graphql";
import { FiPlus, FiX } from "react-icons/fi";
import EmployeeHourCreateForm from "./EmployeeHourCreateForm";

interface IEmployeeHours {
  dailyReport: DailyReportFullSnippetFragment;
}

const EmployeeHours = ({ dailyReport }: IEmployeeHours) => {
  const [addForm, setAddForm] = React.useState(false);

  const [collapsed, setCollapsed] = React.useState(true);

  return (
    <Card>
      <Flex flexDir="row" justifyContent="space-between">
        <Heading
          w="100%"
          my="auto"
          ml={2}
          size="md"
          cursor="pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          Employee Hours
        </Heading>
        <IconButton
          icon={addForm ? <FiX /> : <FiPlus />}
          aria-label="add"
          backgroundColor="transparent"
          onClick={() => setAddForm(!addForm)}
        />
      </Flex>
      {addForm && (
        <EmployeeHourCreateForm
          dailyReport={dailyReport}
          closeForm={() => setAddForm(false)}
        />
      )}
      {!collapsed && (
        <Flex flexDir="column" w="100%" px={4} py={2}>
          {dailyReport.employeeWork.map((work) => (
            <EmployeeWorkCard
              employeeWork={work}
              dailyReportDate={dailyReport.date}
              key={work._id}
            />
          ))}
        </Flex>
      )}
    </Card>
  );
};

export default EmployeeHours;
