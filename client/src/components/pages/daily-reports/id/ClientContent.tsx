import {
  Box,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { useDailyReportUpdateForm } from "../../../../forms/dailyReport";
import {
  useDailyReportFullQuery,
  useDailyReportJobCostApprovalUpdateMutation,
  useDailyReportPayrollCompleteUpdateMutation,
  useDailyReportUpdateMutation,
} from "../../../../generated/graphql";
import createLink from "../../../../utils/createLink";
import AdminOnly from "../../../Common/AdminOnly";

import Card from "../../../Common/Card";
import Checkbox from "../../../Common/forms/Checkbox";
import SubmitButton from "../../../Common/forms/SubmitButton";
import Loading from "../../../Common/Loading";
import TextGrid from "../../../Common/TextGrid";
import TextLink from "../../../Common/TextLink";
import EmployeeHours from "./views/EmployeeHours";
import MaterialShipments from "./views/MaterialShipments";
import Production from "./views/Production";
import ReportNotes from "./views/ReportNotes";
import VehicleWork from "./views/VehicleWork";

interface IDailyReportClientContent {
  id: string;
}

const DailyReportClientContent = ({ id }: IDailyReportClientContent) => {
  /**
   * ----- Hook Initialization -----
   */

  const { data } = useDailyReportFullQuery({
    variables: {
      id,
    },
  });

  const {
    isOpen: editModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const [update, { loading }] = useDailyReportUpdateMutation();

  const [updateApproval, { loading: approvalLoading }] =
    useDailyReportJobCostApprovalUpdateMutation();

  const [updatePayrollComplete, { loading: payrollLoading }] =
    useDailyReportPayrollCompleteUpdateMutation();

  const { FormComponents } = useDailyReportUpdateForm();

  const toast = useToast();

  /**
   * ----- Variables -----
   */

  const canUpdateJobsite = React.useMemo(() => {
    let canUpdate = true;
    if (data?.dailyReport)
      for (let i = 0; i < data?.dailyReport.materialShipments.length; i++) {
        const materialShipment = data.dailyReport.materialShipments[i];
        if (materialShipment.noJobsiteMaterial === false) canUpdate = false;
      }

    return canUpdate;
  }, [data?.dailyReport]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (data?.dailyReport) {
      return (
        <Box>
          <Card>
            <Flex flexDir="row" justifyContent="space-evenly">
              <SimpleGrid
                columns={[1, 1, 2]}
                spacing={4}
                w={["85%", "90%", "95%"]}
              >
                <Box
                  backgroundColor="gray.100"
                  borderRadius={4}
                  m={2}
                  p={2}
                  w="100%"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <TextGrid
                    rows={[
                      {
                        title: (
                          <Text as="span" fontWeight="bold">
                            Date:{" "}
                          </Text>
                        ),
                        text: (
                          <Text as="span">
                            {dayjs(data?.dailyReport.date).format(
                              "MMMM DD, YYYY"
                            )}
                          </Text>
                        ),
                      },
                      {
                        title: (
                          <Text as="span" fontWeight="bold">
                            Jobsite:{" "}
                          </Text>
                        ),
                        text: (
                          <TextLink
                            link={createLink.jobsite(
                              data?.dailyReport.jobsite._id
                            )}
                          >
                            {data?.dailyReport.jobsite.name}
                          </TextLink>
                        ),
                      },
                      {
                        title: (
                          <Text as="span" fontWeight="bold">
                            Crew:{" "}
                          </Text>
                        ),
                        text: (
                          <TextLink
                            link={createLink.crew(data?.dailyReport.crew._id)}
                          >
                            {data?.dailyReport.crew.name}
                          </TextLink>
                        ),
                      },
                    ]}
                  />
                </Box>
                <AdminOnly>
                  <Box
                    backgroundColor="gray.100"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius={4}
                    m={2}
                    p={2}
                    w="100%"
                  >
                    <Flex flexDir="column">
                      <Checkbox
                        isDisabled={approvalLoading}
                        isChecked={data?.dailyReport.jobCostApproved}
                        onChange={(e) => {
                          updateApproval({
                            variables: {
                              id: data?.dailyReport._id,
                              approved: e.target.checked,
                            },
                          });
                        }}
                      >
                        Job Cost Approval
                      </Checkbox>
                      <Checkbox
                        isDisabled={payrollLoading}
                        isChecked={data?.dailyReport.payrollComplete}
                        onChange={(e) => {
                          updatePayrollComplete({
                            variables: {
                              id: data?.dailyReport._id,
                              complete: e.target.checked,
                            },
                          });
                        }}
                      >
                        Pay Roll Complete
                      </Checkbox>
                    </Flex>
                    <Text>
                      <TextLink
                        newTab
                        link={`/daily-report/${data.dailyReport._id}/pdf`}
                      >
                        PDF Report
                      </TextLink>
                    </Text>
                  </Box>
                </AdminOnly>
              </SimpleGrid>
              <Box>
                <IconButton
                  backgroundColor="transparent"
                  icon={<FiEdit />}
                  aria-label="edit"
                  onClick={onEditModalOpen}
                />
              </Box>
            </Flex>
          </Card>

          <SimpleGrid columns={[1, 1, 1, 2]} spacingX={4} spacingY={2}>
            <EmployeeHours dailyReport={data.dailyReport} />

            <VehicleWork dailyReport={data.dailyReport} />

            <Production dailyReport={data.dailyReport} />

            <MaterialShipments dailyReport={data.dailyReport} />
          </SimpleGrid>

          <ReportNotes dailyReport={data.dailyReport} />

          {/* REPORT EDIT MODAL */}
          <Modal isOpen={editModalOpen} onClose={onEditModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Report</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                <FormComponents.Form
                  submitHandler={(data) => {
                    update({
                      variables: {
                        id,
                        data,
                      },
                    }).then(() => {
                      onEditModalClose();
                      toast({
                        title: "Successfully edited.",
                        description: "Daily Report was successfully edited",
                        status: "success",
                        isClosable: true,
                      });
                    });
                  }}
                >
                  <FormComponents.Date
                    isLoading={loading}
                    defaultValue={data.dailyReport.date}
                  />
                  <FormComponents.Jobsite
                    helperText={
                      !canUpdateJobsite && (
                        <Tooltip label="Material shipments linked to Jobsite materials">
                          Cannot update jobsite
                        </Tooltip>
                      )
                    }
                    isLoading={canUpdateJobsite ? loading : true}
                    defaultValue={data.dailyReport.jobsite._id}
                  />
                  <SubmitButton isLoading={loading} />
                </FormComponents.Form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      );
    } else {
      return <Loading />;
    }
  }, [
    FormComponents,
    approvalLoading,
    canUpdateJobsite,
    data?.dailyReport,
    editModalOpen,
    id,
    loading,
    onEditModalClose,
    onEditModalOpen,
    payrollLoading,
    toast,
    update,
    updateApproval,
    updatePayrollComplete,
  ]);

  return content;
};

export default DailyReportClientContent;
