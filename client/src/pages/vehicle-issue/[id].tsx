import React from "react";

import { GetServerSideProps } from "next";
import { PageVehicleIssueComp, ssrVehicleIssue } from "../../generated/page";
import Container from "../../components/Common/Container";
import Breadcrumbs from "../../components/Common/Breadcrumbs";
import Card from "../../components/Common/Card";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import TextGrid from "../../components/Common/TextGrid";
import dayjs from "dayjs";
import TextLink from "../../components/Common/TextLink";
import createLink from "../../utils/createLink";
import VehicleIssueAssignedToSelect from "../../components/Forms/VehicleIssue/AssignedToSelect";
import {
  UserRoles,
  UserTypes,
  useVehicleIssueAssignedToUpdateMutation,
  useVehicleIssueCloseMutation,
} from "../../generated/graphql";
import Permission from "../../components/Common/Permission";
import { useRouter } from "next/router";
import vehicleIssuePriorityString from "../../utils/vehicleIssuePriorityString";
import OperatorDailyReportCard from "../../components/Common/OperatorDailyReport/OperatorDailyReportCard";

const VehicleIssue: PageVehicleIssueComp = ({ data }) => {
  const vehicleIssue = data?.vehicleIssue!;

  /**
   * --- Hook Initialization ---
   */

  const toast = useToast();

  const router = useRouter();

  const [updateAssignedTo, { loading: assignedToLoading }] =
    useVehicleIssueAssignedToUpdateMutation();

  const [close, { loading: closeLoading }] = useVehicleIssueCloseMutation({
    variables: { id: vehicleIssue._id },
  });

  /**
   * --- Functions ---
   */

  const handleAssignedToUpdate = async (assignedTo: string) => {
    try {
      const result = await updateAssignedTo({
        variables: {
          assignedTo: assignedTo ? assignedTo : undefined,
          id: vehicleIssue._id,
        },
      });

      if (result.data?.vehicleIssueAssignedToUpdate) {
        toast({
          title: "Success",
          description: "Successfully updated",
          isClosable: true,
          status: "success",
        });
        router.reload();
      } else {
        toast({
          title: "Error",
          description: "Something went wrong, please try again",
          isClosable: true,
          status: "error",
        });
      }
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message,
        isClosable: true,
        status: "error",
      });
    }
  };

  const handleClose = async () => {
    try {
      const result = await close();

      if (result.data?.vehicleIssueClose) {
        toast({
          title: "Success",
          description: "Successfully closed",
          isClosable: true,
          status: "success",
        });
        router.reload();
      } else {
        toast({
          title: "Error",
          description: "Something went wrong, please try again",
          isClosable: true,
          status: "error",
        });
      }
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message,
        isClosable: true,
        status: "error",
      });
    }
  };

  /**
   * --- Rendering ---
   */

  return (
    <Container>
      <Breadcrumbs
        crumbs={[
          {
            title: "Vehicle Issues",
            link: "/vehicle-issues",
          },
          {
            title: vehicleIssue.title,
            isCurrentPage: true,
          },
        ]}
      />
      <Card>
        <SimpleGrid columns={2}>
          <TextGrid
            rows={[
              {
                title: (
                  <Text as="span" fontWeight="bold">
                    Vehicle:{" "}
                  </Text>
                ),
                text: (
                  <TextLink
                    link={createLink.vehicle(vehicleIssue.vehicle._id)}
                    as="span"
                  >
                    {vehicleIssue.vehicle.name} (
                    {vehicleIssue.vehicle.vehicleCode})
                  </TextLink>
                ),
              },
              {
                title: (
                  <Text as="span" fontWeight="bold" h="100%" p="auto">
                    Author:{" "}
                  </Text>
                ),
                text: (
                  <TextLink link={createLink.employee(vehicleIssue.author._id)}>
                    {vehicleIssue.author.name}
                  </TextLink>
                ),
              },
              {
                title: (
                  <Text as="span" fontWeight="bold" h="100%" p="auto">
                    Created:{" "}
                  </Text>
                ),
                text: dayjs(vehicleIssue.createdAt).format("MMM D, YYYY"),
              },
            ]}
          />
          <TextGrid
            rows={[
              {
                title: (
                  <Text as="span" fontWeight="bold" h="100%" p="auto">
                    Status:{" "}
                  </Text>
                ),
                text: vehicleIssue.closed ? "Closed" : "Open",
              },
              {
                title: (
                  <Text as="span" fontWeight="bold" h="100%" p="auto">
                    Priority:{" "}
                  </Text>
                ),
                text: vehicleIssuePriorityString(vehicleIssue.priority),
              },
              {
                title: (
                  <Box
                    h="100%"
                    display="flex"
                    flexDir="column"
                    justifyContent="center"
                  >
                    <Text as="span" fontWeight="bold">
                      Assigned To:{" "}
                    </Text>
                  </Box>
                ),
                text: (
                  <Box
                    h="100%"
                    display="flex"
                    flexDir="column"
                    justifyContent="center"
                  >
                    <Permission
                      minRole={UserRoles.ProjectManager}
                      type={UserTypes.VehicleMaintenance}
                      alternativeDisplay={
                        vehicleIssue.assignedTo?.name || "None"
                      }
                    >
                      <VehicleIssueAssignedToSelect
                        value={vehicleIssue.assignedTo?._id}
                        onChange={(event) =>
                          handleAssignedToUpdate(event.target.value)
                        }
                        isDisabled={assignedToLoading}
                      />
                    </Permission>
                  </Box>
                ),
              },
            ]}
          />
        </SimpleGrid>
      </Card>

      {/* OPERATOR DAILY REPORT */}
      {vehicleIssue.operatorDailyReport ? (
        <Accordion allowToggle m={2}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Operator Daily Report
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <OperatorDailyReportCard
                operatorDailyReport={vehicleIssue.operatorDailyReport}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ) : null}

      <Box backgroundColor="gray.200" borderRadius={4} p={2}>
        <Heading size="md">Description</Heading>
        {vehicleIssue.description}
      </Box>

      {vehicleIssue.closed === false ? (
        <Permission
          minRole={UserRoles.ProjectManager}
          type={UserTypes.VehicleMaintenance}
        >
          <Button
            my={2}
            w="100%"
            colorScheme="red"
            variant="outline"
            isLoading={closeLoading}
            onClick={() => {
              if (window.confirm("Are you sure?")) {
                handleClose();
              }
            }}
          >
            Close Issue
          </Button>
        </Permission>
      ) : null}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  ...ctx
}) => {
  const res = await ssrVehicleIssue.getServerPage(
    { variables: { id: params?.id as string } },
    ctx
  );

  let notFound = false;
  if (!res.props.data.vehicleIssue) notFound = true;

  return { ...res, notFound };
};

export default VehicleIssue;
