import React from "react";

import { Box, Heading, SimpleGrid, useToast } from "@chakra-ui/react";
import Container from "../../../components/Common/Container";
import { useOperatorDailyReportForm } from "../../../forms/operatorDailyReport";
import SubmitButton from "../../../components/Common/forms/SubmitButton";
import { GetServerSideProps } from "next";
import { PageVehicleSsrComp, ssrVehicleSsr } from "../../../generated/page";
import {
  OperatorDailyReportCreateData,
  useOperatorDailyReportCreateMutation,
} from "../../../generated/graphql";
import { useRouter } from "next/router";
import createLink from "../../../utils/createLink";

const VehicleOperatorDailyReportCreate: PageVehicleSsrComp = ({ data }) => {
  const vehicle = data?.vehicle!;
  /**
   * ----- Hook Initialization -----
   */

  const toast = useToast();

  const router = useRouter();

  const { FormComponents } = useOperatorDailyReportForm();

  const [create, { loading: isLoading }] =
    useOperatorDailyReportCreateMutation();

  /**
   * --- Functions ---
   */

  const handleSubmit = async (data: OperatorDailyReportCreateData) => {
    try {
      const res = await create({
        variables: {
          vehicleId: vehicle._id,
          data,
        },
      });

      if (res.data?.operatorDailyReportCreate) {
        router.push(
          createLink.operatorDailyReport(res.data.operatorDailyReportCreate._id)
        );
      } else {
        toast({
          status: "error",
          title: "Error",
          description: "Something went wrong, please try again",
          isClosable: true,
        });
      }
    } catch (e: any) {
      toast({
        status: "error",
        title: "Error",
        description: e.message,
        isClosable: true,
      });
    }
  };

  /**
   * ----- Rendering -----
   */

  return (
    <Container>
      <Heading>Operator Report for {vehicle.vehicleCode}</Heading>
      <FormComponents.Form submitHandler={handleSubmit}>
        <Box backgroundColor="gray.200" borderRadius={4} p={2} m={2}>
          <Heading size="md">General</Heading>
          <FormComponents.EquipmentUsage isLoading={isLoading} />
          <FormComponents.StartTime isLoading={isLoading} />
        </Box>
        <Box backgroundColor="gray.200" borderRadius={4} p={2} m={2}>
          <Heading size="md">Checklist</Heading>
          <SimpleGrid columns={[1, 2]} spacing={2}>
            <FormComponents.Checklist.Walkaround isLoading={isLoading} />
            <FormComponents.Checklist.VisualInspection isLoading={isLoading} />
            <FormComponents.Checklist.Oil isLoading={isLoading} />
            <FormComponents.Checklist.Coolant isLoading={isLoading} />
            <FormComponents.Checklist.Fluids isLoading={isLoading} />
          </SimpleGrid>
        </Box>
        <Box backgroundColor="gray.200" borderRadius={4} p={2} m={2}>
          <Heading size="md">Function Checks</Heading>
          <SimpleGrid columns={[1, 2]} spacing={2}>
            <FormComponents.FunctionChecks.BackupAlarm isLoading={isLoading} />
            <FormComponents.FunctionChecks.Lights isLoading={isLoading} />
            <FormComponents.FunctionChecks.LicensePlate isLoading={isLoading} />
            <FormComponents.FunctionChecks.FireExtinguisher
              isLoading={isLoading}
            />
          </SimpleGrid>
        </Box>
        <Box backgroundColor="gray.200" borderRadius={4} p={2} m={2}>
          <Heading size="md">Issue Checks</Heading>
          <SimpleGrid columns={[1, 2]} spacing={2}>
            <FormComponents.DamageObserved isLoading={isLoading} />
            <FormComponents.Malfunction isLoading={isLoading} />
          </SimpleGrid>
        </Box>
        <Box backgroundColor="gray.200" borderRadius={4} p={2} m={2}>
          <Heading size="md">Leaks</Heading>
          <FormComponents.Leaks isLoading={isLoading} m={2} />
        </Box>
        <Box backgroundColor="gray.200" borderRadius={4} p={2} m={2}>
          <Heading size="md">Fluids Added</Heading>
          <FormComponents.FluidsAdded isLoading={isLoading} m={2} />
        </Box>
        <SubmitButton isLoading={isLoading} />
      </FormComponents.Form>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  ...ctx
}) => {
  const res = await ssrVehicleSsr.getServerPage(
    { variables: { id: params?.id as string } },
    ctx
  );

  let notFound = false;
  if (!res.props.data.vehicle) notFound = true;

  return { ...res, notFound };
};

export default VehicleOperatorDailyReportCreate;
