import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { FiTrash, FiX } from "react-icons/fi";
import {
  JobsiteFullSnippetFragment,
  useJobsiteRemoveMutation,
} from "../../../../../generated/graphql";
import createLink from "../../../../../utils/createLink";
import JobsiteSearch from "../../../../Search/JobsiteSearch";

interface IJobsiteRemoveModal {
  jobsite: JobsiteFullSnippetFragment;
  isOpen: boolean;
  onClose: () => void;
}

const JobsiteRemoveModal = ({
  jobsite,
  isOpen,
  onClose,
}: IJobsiteRemoveModal) => {
  /**
   * ----- Hook Initialization -----
   */

  const [transferJobsiteId, setTransferJobsiteId] = React.useState<string>();

  const [remove, { loading }] = useJobsiteRemoveMutation();

  const toast = useToast();

  /**
   * ----- Variables -----
   */

  const requiresTransfer = React.useMemo(() => {
    if (jobsite.dailyReports.length > 0) return true;
    if (jobsite.revenueInvoices.length > 0) return true;
    if (jobsite.expenseInvoices.length > 0) return true;
    if (jobsite.materials.length > 0) return true;
    return false;
  }, [jobsite]);

  /**
   * ----- Functions -----
   */

  const handleRemove = async () => {
    try {
      const res = await remove({
        variables: {
          id: jobsite._id,
          transferJobsiteId,
        },
      });

      if (res.data?.jobsiteRemove) {
        onClose();
        if (transferJobsiteId) {
          router.push(createLink.jobsite(transferJobsiteId));
        } else {
          router.push("/");
        }
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
   * ----- Render -----
   */

  const bodyContent = React.useMemo(() => {
    if (requiresTransfer) {
      return (
        <Stack spacing={2}>
          <Text>
            This jobsite has associated invoices, reports and/or materials.
          </Text>
          <Text fontWeight="bold">
            Please choose a jobsite to transfer this data to before removing
            this jobsite.
          </Text>
          <JobsiteSearch
            jobsiteSelected={(jobsite) => setTransferJobsiteId(jobsite._id)}
          />
        </Stack>
      );
    } else {
      return (
        <Text fontWeight="bold">
          Are you sure you want to remove this jobsite? This action cannot be
          undone.
        </Text>
      );
    }
  }, [requiresTransfer]);

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remove Jobsite</ModalHeader>
        <ModalBody>{bodyContent}</ModalBody>
        <ModalFooter>
          <SimpleGrid columns={2} spacing={2}>
            <Button
              onClick={() => onClose()}
              variantColor="gray"
              variant="outline"
              leftIcon={<FiX />}
              size="md"
              isLoading={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleRemove();
              }}
              colorScheme="red"
              isLoading={loading}
              loadingText="Removing..."
              variant="solid"
              leftIcon={<FiTrash />}
              size="md"
              mr={2}
            >
              Remove
            </Button>
          </SimpleGrid>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JobsiteRemoveModal;
