import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FiTrash, FiX } from "react-icons/fi";
import { JobsiteFullSnippetFragment } from "../../../../../generated/graphql";

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
   * ----- Variables -----
   */

  const requiresTransfer = React.useMemo(() => {
    if (jobsite.dailyReports.length > 0) return true;
    if (jobsite.revenueInvoices.length > 0) return true;
    if (jobsite.expenseInvoices.length > 0) return true;
    if (jobsite.materials.length > 0) return true;
    return false;
  }, [jobsite]);

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remove Jobsite</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Are you sure you want to remove this jobsite?</p>
          <p>This action cannot be undone.</p>
          <Button
            onClick={() => {
              onClose();
            }}
            color="red"
            isLoading={false}
            loadingText="Removing..."
            variant="solid"
            leftIcon={<FiTrash />}
            size="md"
            mr={2}
          >
            Remove
          </Button>
          <Button
            onClick={() => onClose()}
            variantColor="gray"
            variant="outline"
            leftIcon={<FiX />}
            size="md"
          >
            Cancel
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default JobsiteRemoveModal;
