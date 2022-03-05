import { Box, SimpleGrid, useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { useMaterialShipmentCreateForm } from "../../../../../forms/materialShipment";
import {
  DailyReportFullDocument,
  DailyReportFullSnippetFragment,
  MaterialShipmentCreateData,
  useMaterialShipmentCreateMutation,
} from "../../../../../generated/graphql";
import convertHourToDate from "../../../../../utils/convertHourToDate";
import SubmitButton from "../../../../Common/forms/SubmitButton";

interface IMaterialShipmentCreateForm {
  dailyReport: DailyReportFullSnippetFragment;
  closeForm?: () => void;
}

const MaterialShipmentCreateForm = ({
  dailyReport,
  closeForm,
}: IMaterialShipmentCreateForm) => {
  /**
   * ----- Hook Initialization -----
   */

  const toast = useToast();

  const [create, { loading }] = useMaterialShipmentCreateMutation({
    refetchQueries: [DailyReportFullDocument],
  });

  const { FormComponents } = useMaterialShipmentCreateForm();

  /**
   * ----- Functions -----
   */

  const submitCreation = React.useCallback(
    (data: MaterialShipmentCreateData) => {
      let startTime = data.startTime;
      if (startTime && !dayjs(startTime).isValid()) {
        startTime = convertHourToDate(data.startTime, dailyReport.date);
      }

      let endTime = data.endTime;
      if (endTime && !dayjs(endTime).isValid()) {
        endTime = convertHourToDate(data.endTime, dailyReport.date);
      }

      create({
        variables: {
          dailyReportId: dailyReport._id,
          data: {
            ...data,
            startTime,
            endTime,
          },
        },
      }).then(() => {
        toast({
          title: "Success",
          description: "Production successfully created",
          isClosable: true,
          status: "success",
        });
        if (closeForm) closeForm();
      });
    },
    [closeForm, create, dailyReport._id, dailyReport.date, toast]
  );

  /**
   * ----- Rendering -----
   */

  return (
    <Box backgroundColor="gray.200" borderRadius={4} p={2} m={2}>
      <FormComponents.Form submitHandler={submitCreation}>
        <SimpleGrid columns={[1, 1, 2]} spacing={2}>
          <FormComponents.ShipmentType isLoading={loading} />
          <FormComponents.Supplier isLoading={loading} />
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2]} spacing={2}>
          <FormComponents.Quantity isLoading={loading} />
          <FormComponents.Unit isLoading={loading} />
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 3]} spacing={2}>
          <FormComponents.Source isLoading={loading} />
          <FormComponents.VehicleType isLoading={loading} />
          <FormComponents.VehicleCode isLoading={loading} />
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2]} spacing={2}>
          <FormComponents.StartTime isLoading={loading} />
          <FormComponents.EndTime isLoading={loading} />
        </SimpleGrid>
        <SubmitButton isLoading={loading} />
      </FormComponents.Form>
    </Box>
  );
};

export default MaterialShipmentCreateForm;
