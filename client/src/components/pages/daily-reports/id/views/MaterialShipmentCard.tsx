import React from "react";

import { Box, Flex, IconButton, SimpleGrid, Text } from "@chakra-ui/react";
import {
  DailyReportFullDocument,
  MaterialShipmentCardSnippetFragment,
  MaterialShipmentShipmentData,
  useMaterialShipmentDeleteMutation,
  useMaterialShipmentUpdateMutation,
} from "../../../../../generated/graphql";
import { FiEdit, FiTrash, FiX } from "react-icons/fi";
import { useMaterialShipmentUpdateForm } from "../../../../../forms/materialShipment";
import dayjs from "dayjs";
import convertHourToDate from "../../../../../utils/convertHourToDate";
import SubmitButton from "../../../../Common/forms/SubmitButton";

interface IMaterialShipmentCard {
  materialShipment: MaterialShipmentCardSnippetFragment;
  dailyReportDate: Date;
}

const MaterialShipmentCard = ({
  materialShipment,
  dailyReportDate,
}: IMaterialShipmentCard) => {
  /**
   * ----- Hook Initialization -----
   */

  const [edit, setEdit] = React.useState(false);

  const [update, { loading }] = useMaterialShipmentUpdateMutation();

  const [remove] = useMaterialShipmentDeleteMutation({
    variables: {
      id: materialShipment._id,
    },
    refetchQueries: [DailyReportFullDocument],
  });

  const { FormComponents } = useMaterialShipmentUpdateForm({
    defaultValues: {
      shipmentType: materialShipment.shipmentType,
      supplier: materialShipment.supplier,
      startTime: materialShipment.startTime,
      endTime: materialShipment.endTime,
      quantity: materialShipment.quantity,
      unit: materialShipment.unit,
    },
  });

  /**
   * ----- Functions -----
   */

  const submitUpdate = React.useCallback(
    (data: MaterialShipmentShipmentData) => {
      let startTime = data.startTime;
      if (startTime && !dayjs(startTime).isValid()) {
        startTime = convertHourToDate(data.startTime, dailyReportDate);
      }

      let endTime = data.endTime;
      if (endTime && !dayjs(endTime).isValid()) {
        endTime = convertHourToDate(data.endTime, dailyReportDate);
      }

      update({
        variables: {
          id: materialShipment._id,
          data: {
            ...data,
            startTime,
            endTime,
          },
        },
      }).then(() => setEdit(false));
    },
    [dailyReportDate, materialShipment._id, update]
  );

  /**
   * ----- Rendering -----
   */

  return (
    <Box p={2} w="100%" border="1px solid lightgray">
      <Flex flexDir="row" justifyContent="space-between">
        <Box>
          <Text>
            <Text as="span" fontWeight="bold">
              {materialShipment.supplier} {materialShipment.shipmentType}
            </Text>
            {" - "}
            {materialShipment.quantity} {materialShipment.unit}
          </Text>
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
          <FormComponents.Form submitHandler={submitUpdate}>
            <SimpleGrid columns={[1, 1, 2]} spacing={2}>
              <FormComponents.ShipmentType isLoading={loading} />
              <FormComponents.Supplier isLoading={loading} />
            </SimpleGrid>

            <SimpleGrid columns={[1, 1, 2]} spacing={2}>
              <FormComponents.Quantity isLoading={loading} />
              <FormComponents.Unit isLoading={loading} />
            </SimpleGrid>

            <SimpleGrid columns={[1, 1, 2]} spacing={2}>
              <FormComponents.StartTime isLoading={loading} />
              <FormComponents.EndTime isLoading={loading} />
            </SimpleGrid>
            <SubmitButton isLoading={loading} />
          </FormComponents.Form>
        </Box>
      )}
    </Box>
  );
};

export default MaterialShipmentCard;
