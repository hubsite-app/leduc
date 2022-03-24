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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { useAuth } from "../../../../contexts/Auth";
import { useDailyReportUpdateForm } from "../../../../forms/dailyReport";
import {
  useDailyReportApprovalUpdateMutation,
  useDailyReportFullQuery,
  useDailyReportUpdateMutation,
} from "../../../../generated/graphql";
import createLink from "../../../../utils/createLink";

import Card from "../../../Common/Card";
import Checkbox from "../../../Common/forms/Checkbox";
import SubmitButton from "../../../Common/forms/SubmitButton";
import Loading from "../../../Common/Loading";
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

  const {
    state: { user },
  } = useAuth();

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
    useDailyReportApprovalUpdateMutation();

  const { FormComponents } = useDailyReportUpdateForm();

  const toast = useToast();

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (data?.dailyReport) {
      return (
        <Box>
          <Card>
            <Flex flexDir="row" justifyContent="space-between">
              <Box>
                <Text>
                  <Text as="span" fontWeight="bold">
                    Date:{" "}
                  </Text>
                  <Text as="span">
                    {dayjs(data?.dailyReport.date).format("MMMM DD, YYYY")}
                  </Text>
                </Text>
                <Text>
                  <Text as="span" fontWeight="bold">
                    Jobsite:{" "}
                  </Text>
                  <TextLink
                    link={createLink.jobsite(data?.dailyReport.jobsite._id)}
                  >
                    {data?.dailyReport.jobsite.name}
                  </TextLink>
                </Text>
                <Text>
                  <Text as="span" fontWeight="bold">
                    Crew:{" "}
                  </Text>
                  <TextLink link={createLink.crew(data?.dailyReport.crew._id)}>
                    {data?.dailyReport.crew.name}
                  </TextLink>
                </Text>
                {user?.admin && (
                  <Checkbox
                    isDisabled={approvalLoading}
                    isChecked={data?.dailyReport.approved}
                    onChange={(e) => {
                      updateApproval({
                        variables: {
                          id: data?.dailyReport._id,
                          approved: e.target.checked,
                        },
                      });
                    }}
                  >
                    Approved
                  </Checkbox>
                )}
                <Text>
                  <TextLink
                    newTab
                    link={`/daily-report/${data.dailyReport._id}/pdf`}
                  >
                    PDF Report
                  </TextLink>
                </Text>
              </Box>
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
    data?.dailyReport,
    editModalOpen,
    id,
    loading,
    onEditModalClose,
    onEditModalOpen,
    toast,
    update,
    updateApproval,
    user?.admin,
  ]);

  return content;
};

export default DailyReportClientContent;
