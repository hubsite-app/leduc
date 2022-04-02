import React from "react";

import {
  Box,
  BoxProps,
  Flex,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import {
  DailyReportForMaterialShipmentSnippetFragment,
  DailyReportFullDocument,
  MaterialShipmentCardSnippetFragment,
  useMaterialShipmentDeleteMutation,
} from "../../../generated/graphql";
import { FiEdit, FiTrash, FiX } from "react-icons/fi";
import MaterialShipmentUpdate from "../../Forms/MaterialShipment/MaterialShipmentUpdate";
import Warning from "../Warning";

interface IMaterialShipmentCard extends BoxProps {
  materialShipment: MaterialShipmentCardSnippetFragment;
  dailyReport: DailyReportForMaterialShipmentSnippetFragment;
}

const MaterialShipmentCard = ({
  materialShipment,
  dailyReport,
  ...props
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
    if (
      materialShipment.schemaVersion === 1 ||
      materialShipment.noJobsiteMaterial
    ) {
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
    <Box p={2} w="100%" border="1px solid lightgray" {...props}>
      <Flex flexDir="row" justifyContent="space-between">
        <Box>
          {content}
          {materialShipment.vehicleObject?.source}{" "}
          {materialShipment.vehicleObject?.vehicleType}{" "}
          {materialShipment.vehicleObject?.vehicleCode}
        </Box>
        <HStack dir="horizontal" spacing={2} h="100%">
          {materialShipment.noJobsiteMaterial && (
            <Warning tooltip="No costing" />
          )}
          {edit && (
            <IconButton
              m="auto"
              backgroundColor="transparent"
              icon={<FiTrash />}
              aria-label="delete"
              onClick={() => window.confirm("Are you sure?") && remove()}
            />
          )}
          <IconButton
            m="auto"
            backgroundColor="transparent"
            icon={edit ? <FiX /> : <FiEdit />}
            aria-label="edit"
            onClick={() => setEdit(!edit)}
          />
        </HStack>
      </Flex>
      {edit && (
        <Box backgroundColor="gray.200" p={2} borderRadius={4}>
          <MaterialShipmentUpdate
            materialShipment={materialShipment}
            dailyReport={dailyReport}
            onSuccess={() => setEdit(false)}
          />
        </Box>
      )}
    </Box>
  );
};

export default MaterialShipmentCard;
