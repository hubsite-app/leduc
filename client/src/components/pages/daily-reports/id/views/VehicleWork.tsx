import { Flex, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { FiPlus, FiX } from "react-icons/fi";

import { DailyReportFullSnippetFragment } from "../../../../../generated/graphql";
import Card from "../../../../Common/Card";
import VehicleWorkCreateForm from "./VehicleWorkCreateForm";
import VehicleWorkCard from "./VehicleWorldCard";

interface IVehicleWork {
  dailyReport: DailyReportFullSnippetFragment;
}

const VehicleWork = ({ dailyReport }: IVehicleWork) => {
  const [addForm, setAddForm] = React.useState(false);

  const [collapsed, setCollapsed] = React.useState(true);

  return (
    <Card h="fit-content">
      <Flex flexDir="row" justifyContent="space-between">
        <Heading
          my="auto"
          ml={2}
          size="md"
          w="100%"
          cursor="pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          Vehicle Hours ({dailyReport.vehicleWork.length || 0})
        </Heading>
        <IconButton
          icon={addForm ? <FiX /> : <FiPlus />}
          aria-label="add"
          backgroundColor="transparent"
          onClick={() => setAddForm(!addForm)}
        />
      </Flex>
      {addForm && (
        <VehicleWorkCreateForm
          dailyReport={dailyReport}
          closeForm={() => setAddForm(false)}
        />
      )}
      {!collapsed && (
        <Flex flexDir="column" w="100%" px={4} py={2}>
          {dailyReport.vehicleWork.map((work) => (
            <VehicleWorkCard vehicleWork={work} key={work._id} />
          ))}
        </Flex>
      )}
    </Card>
  );
};

export default VehicleWork;
