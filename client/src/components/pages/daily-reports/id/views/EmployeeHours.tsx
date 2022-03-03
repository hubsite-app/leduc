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

  return (
    <Card>
      <Flex flexDir="row" justifyContent="space-between">
        <Heading my="auto" ml={2} size="md">
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
      <Flex flexDir="column" w="100%" px={4} py={2}>
        {dailyReport.employeeWork.map((work) => (
          <EmployeeWorkCard
            employeeWork={work}
            dailyReportDate={dailyReport.date}
            key={work._id}
          />
        ))}
      </Flex>
    </Card>
  );
};

export default EmployeeHours;
