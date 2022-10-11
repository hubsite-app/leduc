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
import { FiEdit, FiTrash } from "react-icons/fi";
import { useJobsiteFullQuery, UserRoles } from "../../../../generated/graphql";
import { JobsiteQueryKeys } from "../../../../utils/createLink";
import Card from "../../../Common/Card";
import DailyReportListCard from "../../../Common/DailyReport/DailyReportListCard";
import JobsiteMonthlyReportList from "../../../Common/JobsiteMonthlyReport/List";
import JobsiteYearlyReportList from "../../../Common/JobsiteYearReport/List";
import Loading from "../../../Common/Loading";
import Permission from "../../../Common/Permission";
import JobsiteUpdateForm from "../../../Forms/Jobsite/JobsiteUpdate";
import ExpenseInvoices from "./views/ExpenseInvoices";
import JobsiteFileObjects from "./views/FileObjects";
import JobsiteMaterialsCosting from "./views/JobsiteMaterials";
import JobsiteRemoveModal from "./views/RemoveModal";
import RevenueInvoices from "./views/RevenueInvoices";
import TruckingRates from "./views/TruckingRates";
import JobsiteContract from "./views/Contract";

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
  const {
    isOpen: isOpenRemove,
    onOpen: onOpenRemove,
    onClose: onCloseRemove,
  } = useDisclosure();

  const router = useRouter();

  /**
   * ----- Variables -----
   */

  const jobsiteMaterialQuery = React.useMemo(() => {
    if (router.query[JobsiteQueryKeys.jobsiteMaterial])
      return router.query[JobsiteQueryKeys.jobsiteMaterial];
    else return null;
  }, [router]);

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
              <SimpleGrid columns={2} spacing={2}>
                <IconButton
                  aria-label="edit"
                  icon={<FiEdit />}
                  backgroundColor="transparent"
                  onClick={() => onOpen()}
                />
                <Permission>
                  <IconButton
                    onClick={onOpenRemove}
                    aria-label="remove"
                    icon={<FiTrash />}
                    backgroundColor="transparent"
                  />
                </Permission>
              </SimpleGrid>
            </Flex>
          </Card>
          <JobsiteFileObjects jobsite={jobsite} />
          <Permission minRole={UserRoles.ProjectManager}>
            <SimpleGrid columns={[1, 1, 1, 2]} spacingX={4} spacingY={2}>
              <JobsiteMaterialsCosting
                jobsite={jobsite}
                selectedJobsiteMaterial={jobsiteMaterialQuery as string}
              />
              <TruckingRates jobsite={jobsite} />
            </SimpleGrid>
            <SimpleGrid columns={[1, 1, 1, 2]} spacingX={4} spacingY={2}>
              <ExpenseInvoices jobsite={jobsite} />
              <RevenueInvoices jobsite={jobsite} />
            </SimpleGrid>
            <SimpleGrid spacingY={2}>
              <JobsiteContract jobsite={jobsite} />
            </SimpleGrid>
            <SimpleGrid columns={[1, 1, 1, 2]} spacingX={4} spacingY={2}>
              <JobsiteYearlyReportList
                jobsiteYearReports={jobsite.yearReports}
              />
              <JobsiteMonthlyReportList
                jobsiteMonthReports={jobsite.monthReports}
              />
            </SimpleGrid>
          </Permission>
          <DailyReportListCard
            dailyReports={jobsite.dailyReports}
            jobsiteId={jobsite._id}
          />

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
          <JobsiteRemoveModal
            jobsite={jobsite}
            isOpen={isOpenRemove}
            onClose={onCloseRemove}
          />
        </Box>
      );
    } else return <Loading />;
  }, [
    data,
    isOpen,
    isOpenRemove,
    jobsiteMaterialQuery,
    onClose,
    onCloseRemove,
    onOpen,
    onOpenRemove,
    router,
  ]);
};

export default JobsiteClientContent;
