import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { useDailyReportUpdateForm } from "../../../../forms/dailyReport";
import {
  useDailyReportFullQuery,
  useDailyReportUpdateMutation,
} from "../../../../generated/graphql";
import Card from "../../../Common/Card";
import SubmitButton from "../../../Common/forms/SubmitButton";
import Loading from "../../../Common/Loading";
import TextLink from "../../../Common/TextLink";
import EmployeeHours from "./views/EmployeeHours";
import EmployeeWorkCard from "./views/EmployeeWorkCard";
import Production from "./views/Production";
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
                    Crew:{" "}
                  </Text>
                  <TextLink link={`/crew/${data?.dailyReport.crew._id}`}>
                    {data?.dailyReport.crew.name}
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

          <EmployeeHours dailyReport={data.dailyReport} />

          <VehicleWork dailyReport={data.dailyReport} />

          <Production dailyReport={data.dailyReport} />

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
    data?.dailyReport,
    editModalOpen,
    id,
    loading,
    onEditModalClose,
    onEditModalOpen,
    toast,
    update,
  ]);

  return content;
};

export default DailyReportClientContent;
