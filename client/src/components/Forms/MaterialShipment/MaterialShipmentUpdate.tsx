import { SimpleGrid } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { useMaterialShipmentUpdateForm } from "../../../forms/materialShipment";
import {
  DailyReportForMaterialShipmentSnippetFragment,
  MaterialShipmentCardSnippetFragment,
  MaterialShipmentShipmentData,
  useMaterialShipmentUpdateMutation,
} from "../../../generated/graphql";
import convertHourToDate from "../../../utils/convertHourToDate";
import SubmitButton from "../../Common/forms/SubmitButton";

interface IMaterialShipmentUpdate {
  materialShipment: MaterialShipmentCardSnippetFragment;
  dailyReport: DailyReportForMaterialShipmentSnippetFragment;
  onSuccess?: () => void;
}

const MaterialShipmentUpdate = ({
  materialShipment,
  dailyReport,
  onSuccess,
}: IMaterialShipmentUpdate) => {
  /**
   * ----- Hook Initialization -----
   */

  const [update, { loading }] = useMaterialShipmentUpdateMutation();

  const { FormComponents, noJobsiteMaterial } = useMaterialShipmentUpdateForm({
    defaultValues: {
      jobsiteMaterialId: materialShipment.jobsiteMaterial?._id,
      noJobsiteMaterial: materialShipment.noJobsiteMaterial,
      quantity: materialShipment.quantity,
      startTime: materialShipment.startTime,
      endTime: materialShipment.endTime,
      shipmentType: materialShipment.shipmentType,
      unit: materialShipment.unit,
      supplier: materialShipment.supplier,
    },
  });

  /**
   * ----- Functions -----
   */

  const handleSubmit = React.useCallback(
    (data: MaterialShipmentShipmentData) => {
      let startTime = data.startTime;
      if (startTime && !dayjs(startTime).isValid()) {
        startTime = convertHourToDate(data.startTime, dailyReport.date);
      }

      let endTime = data.endTime;
      if (endTime && !dayjs(endTime).isValid()) {
        endTime = convertHourToDate(data.endTime, dailyReport.date);
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
    [dailyReport.date, materialShipment._id, onSuccess, update]
  );

  /**
   * ----- Rendering -----
   */

  return (
    <FormComponents.Form submitHandler={handleSubmit}>
      {noJobsiteMaterial ? (
        <>
          <FormComponents.JobsiteMaterial
            jobsiteMaterials={dailyReport.jobsite.materials}
            isLoading={loading}
          />
          <SimpleGrid spacing={2} columns={[1, 1, 2]}>
            <FormComponents.Quantity isLoading={loading} />
            <FormComponents.Unit isLoading={loading} />
          </SimpleGrid>
          <SimpleGrid spacing={2} columns={[1, 1, 2]}>
            <FormComponents.ShipmentType isLoading={loading} />
            <FormComponents.Supplier isLoading={loading} />
          </SimpleGrid>
        </>
      ) : (
        <SimpleGrid spacing={2} columns={[1, 1, 2]}>
          <FormComponents.JobsiteMaterial
            jobsiteMaterials={dailyReport.jobsite.materials}
            isLoading={loading}
          />
          <FormComponents.Quantity isLoading={loading} />
        </SimpleGrid>
      )}
      <SimpleGrid spacing={2} columns={[1, 1, 2]}>
        <FormComponents.StartTime isLoading={loading} />
        <FormComponents.EndTime isLoading={loading} />
      </SimpleGrid>
      <SubmitButton isLoading={loading} />
    </FormComponents.Form>
  );
};

export default MaterialShipmentUpdate;
