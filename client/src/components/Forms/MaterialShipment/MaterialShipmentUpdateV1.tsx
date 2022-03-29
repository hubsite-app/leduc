import { SimpleGrid } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { useMaterialShipmentUpdateFormV1 } from "../../../forms/materialShipment";
import {
  MaterialShipmentCardSnippetFragment,
  MaterialShipmentShipmentDataV1,
  useMaterialShipmentUpdateV1Mutation,
} from "../../../generated/graphql";
import convertHourToDate from "../../../utils/convertHourToDate";
import SubmitButton from "../../Common/forms/SubmitButton";

interface IMaterialShipmentUpdateV1Card {
  materialShipment: MaterialShipmentCardSnippetFragment;
  dailyReportDate: Date;
  onSuccess?: () => void;
}

const MaterialShipmentUpdateV1 = ({
  materialShipment,
  dailyReportDate,
  onSuccess,
}: IMaterialShipmentUpdateV1Card) => {
  /**
   * ----- Hook Initialization -----
   */

  const [update, { loading }] = useMaterialShipmentUpdateV1Mutation();

  const { FormComponents } = useMaterialShipmentUpdateFormV1({
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
    (data: MaterialShipmentShipmentDataV1) => {
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
      }).then(() => {
        if (onSuccess) onSuccess();
      });
    },
    [dailyReportDate, materialShipment._id, onSuccess, update]
  );

  /**
   * ----- Rendering -----
   */

  return (
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
  );
};

export default MaterialShipmentUpdateV1;
