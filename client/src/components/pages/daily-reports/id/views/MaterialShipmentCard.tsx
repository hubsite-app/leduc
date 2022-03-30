import React from "react";

import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import {
  DailyReportFullDocument,
  DailyReportFullSnippetFragment,
  MaterialShipmentCardSnippetFragment,
  useMaterialShipmentDeleteMutation,
} from "../../../../../generated/graphql";
import { FiEdit, FiTrash, FiX } from "react-icons/fi";
import MaterialShipmentUpdateV1 from "../../../../Forms/MaterialShipment/MaterialShipmentUpdateV1";
import MaterialShipmentUpdate from "../../../../Forms/MaterialShipment/MaterialShipmentUpdate";

interface IMaterialShipmentCard {
  materialShipment: MaterialShipmentCardSnippetFragment;
  dailyReport: DailyReportFullSnippetFragment;
}

const MaterialShipmentCard = ({
  materialShipment,
  dailyReport,
}: IMaterialShipmentCard) => {
  /**
   * ----- Hook Initialization -----
   */

  const [edit, setEdit] = React.useState(false);

  const [remove] = useMaterialShipmentDeleteMutation({
    variables: {
      id: materialShipment._id,
    },
    refetchQueries: [DailyReportFullDocument],
  });

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (materialShipment.schemaVersion === 1) {
      return (
        <Text>
          <Text as="span" fontWeight="bold">
            {materialShipment.supplier} {materialShipment.shipmentType}
          </Text>
          {" - "}
          {materialShipment.quantity} {materialShipment.unit}
        </Text>
      );
    } else {
      return (
        <Text>
          <Text as="span" fontWeight="bold">
            {materialShipment.jobsiteMaterial?.supplier.name}{" "}
            {materialShipment.jobsiteMaterial?.material.name}
          </Text>
          {" - "}
          {materialShipment.quantity} {materialShipment.jobsiteMaterial?.unit}
        </Text>
      );
    }
  }, [materialShipment]);

  return (
    <Box p={2} w="100%" border="1px solid lightgray">
      <Flex flexDir="row" justifyContent="space-between">
        <Box>
          {content}
          {materialShipment.vehicleObject?.source}{" "}
          {materialShipment.vehicleObject?.vehicleType}{" "}
          {materialShipment.vehicleObject?.vehicleCode}
        </Box>
        <Flex flexDir="row">
          {edit && (
            <IconButton
              backgroundColor="transparent"
              icon={<FiTrash />}
              aria-label="delete"
              onClick={() => window.confirm("Are you sure?") && remove()}
            />
          )}
          <IconButton
            backgroundColor="transparent"
            icon={edit ? <FiX /> : <FiEdit />}
            aria-label="edit"
            onClick={() => setEdit(!edit)}
          />
        </Flex>
      </Flex>
      {edit && (
        <Box backgroundColor="gray.200" p={2} borderRadius={4}>
          {materialShipment.schemaVersion <= 1 ? (
            <MaterialShipmentUpdateV1
              materialShipment={materialShipment}
              dailyReportDate={dailyReport.date}
              onSuccess={() => setEdit(false)}
            />
          ) : (
            <MaterialShipmentUpdate
              materialShipment={materialShipment}
              dailyReport={dailyReport}
              onSuccess={() => setEdit(false)}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default MaterialShipmentCard;
