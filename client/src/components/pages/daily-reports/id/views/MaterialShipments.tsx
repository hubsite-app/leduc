import { Flex, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { FiPlus, FiX } from "react-icons/fi";

import { DailyReportFullSnippetFragment } from "../../../../../generated/graphql";
import Card from "../../../../Common/Card";
import MaterialShipmentCard from "./MaterialShipmentCard";
import MaterialShipmentCreateForm from "./MaterialShipmentCreateForm";

interface IMaterialShipments {
  dailyReport: DailyReportFullSnippetFragment;
}

const MaterialShipments = ({ dailyReport }: IMaterialShipments) => {
  const [addForm, setAddForm] = React.useState(false);

  const [collapsed, setCollapsed] = React.useState(true);

  return (
    <Card>
      <Flex flexDir="row" justifyContent="space-between">
        <Heading
          my="auto"
          ml={2}
          size="md"
          w="100%"
          cursor="pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          Material Shipments ({dailyReport.materialShipments.length || 0})
        </Heading>
        <IconButton
          icon={addForm ? <FiX /> : <FiPlus />}
          aria-label="add"
          backgroundColor="transparent"
          onClick={() => setAddForm(!addForm)}
        />
      </Flex>
      {addForm && (
        <MaterialShipmentCreateForm
          dailyReport={dailyReport}
          closeForm={() => setAddForm(false)}
        />
      )}
      {!collapsed && (
        <Flex flexDir="column" w="100%" px={4} py={2}>
          {dailyReport.materialShipments.map((materialShipment) => (
            <MaterialShipmentCard
              key={materialShipment._id}
              materialShipment={materialShipment}
              dailyReportDate={dailyReport.date}
            />
          ))}
        </Flex>
      )}
    </Card>
  );
};

export default MaterialShipments;
