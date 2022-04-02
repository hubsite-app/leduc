import { Center, Flex, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { FiPlus, FiX } from "react-icons/fi";

import { DailyReportFullSnippetFragment } from "../../../../../generated/graphql";
import Card from "../../../../Common/Card";
import ShowMore from "../../../../Common/ShowMore";
import MaterialShipmentCreate from "../../../../Forms/MaterialShipment/MaterialShipmentCreate";
import MaterialShipmentCard from "../../../../Common/MaterialShipment/MaterialShipmentCard";

interface IMaterialShipments {
  dailyReport: DailyReportFullSnippetFragment;
}

const MaterialShipments = ({ dailyReport }: IMaterialShipments) => {
  const [addForm, setAddForm] = React.useState(false);

  return (
    <Card h="fit-content">
      <Flex flexDir="row" justifyContent="space-between">
        <Heading my="auto" ml={2} size="md" w="100%">
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
        <MaterialShipmentCreate
          dailyReport={dailyReport}
          onSuccess={() => setAddForm(false)}
        />
      )}
      <Flex flexDir="column" w="100%" px={4} py={2}>
        {dailyReport.materialShipments.length > 0 ? (
          <ShowMore
            list={dailyReport.materialShipments.map((materialShipment) => (
              <MaterialShipmentCard
                key={materialShipment._id}
                materialShipment={materialShipment}
                dailyReport={dailyReport}
              />
            ))}
          />
        ) : (
          <Center>No Material Shipments</Center>
        )}
      </Flex>
    </Card>
  );
};

export default MaterialShipments;
