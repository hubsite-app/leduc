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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { useJobsiteFullQuery, UserRoles } from "../../../../generated/graphql";
import Card from "../../../Common/Card";
import DailyReportListCard from "../../../Common/DailyReport/DailyReportListCard";
import JobsiteMonthlyReportList from "../../../Common/JobsiteMonthlyReport/List";
import JobsiteYearlyReportList from "../../../Common/JobsiteYearReport/List";
import Loading from "../../../Common/Loading";
import Permission from "../../../Common/Permission";
import JobsiteUpdateForm from "../../../Forms/Jobsite/JobsiteUpdate";
import ExpenseInvoices from "./views/ExpenseInvoices";
import JobsiteMaterialsCosting from "./views/JobsiteMaterials";
import RevenueInvoices from "./views/RevenueInvoices";
import TruckingRates from "./views/TruckingRates";

interface IJobsiteClientContent {
  id: string;
}

const JobsiteClientContent = ({ id }: IJobsiteClientContent) => {
  /**
   * ----- Hook Initialization -----
   */

  const { data } = useJobsiteFullQuery({
    variables: { id },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  /**
   * ----- Rendering -----
   */

  return React.useMemo(() => {
    if (data?.jobsite) {
      const { jobsite } = data;

      return (
        <Box>
          <Card>
            <Flex flexDir="row" justifyContent="space-between">
              <Box>
                <Text>
                  <Text fontWeight="bold" as="span">
                    Number:{" "}
                  </Text>
                  {jobsite.jobcode}
                </Text>
                {jobsite.description && (
                  <Text>
                    <Text fontWeight="bold" as="span">
                      Description:{" "}
                    </Text>
                    {jobsite.description}
                  </Text>
                )}
              </Box>
              <IconButton
                aria-label="edit"
                icon={<FiEdit />}
                backgroundColor="transparent"
                onClick={() => onOpen()}
              />
            </Flex>
          </Card>
          <Permission minRole={UserRoles.ProjectManager}>
            <SimpleGrid columns={[1, 1, 1, 2]} spacingX={4} spacingY={2}>
              <JobsiteMaterialsCosting jobsite={jobsite} />
              <TruckingRates jobsite={jobsite} />
            </SimpleGrid>
            <SimpleGrid columns={[1, 1, 1, 2]} spacingX={4} spacingY={2}>
              <ExpenseInvoices jobsite={jobsite} />
              <RevenueInvoices jobsite={jobsite} />
            </SimpleGrid>
            <JobsiteYearlyReportList jobsiteYearReports={jobsite.yearReports} />
            <JobsiteMonthlyReportList
              jobsiteMonthReports={jobsite.monthReports}
            />
          </Permission>
          <DailyReportListCard dailyReports={jobsite.dailyReports} />

          {/* EDIT MODAL */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <JobsiteUpdateForm
                  jobsite={jobsite}
                  onSuccess={() => {
                    onClose();
                    router.reload();
                  }}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      );
    } else return <Loading />;
  }, [data, isOpen, onClose, onOpen, router]);
};

export default JobsiteClientContent;
