import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { FiPlus } from "react-icons/fi";
import CompanyFullList from "../../../Common/Company/FullList";
import Permission from "../../../Common/Permission";
import CompanyCreateForm from "../../../Forms/Company/CompanyCreate";

const CompanySettings = () => {
  /**
   * ----- Hook Initialization -----
   */

  const [add, setAdd] = React.useState(false);

  /**
   * ----- Rendering -----
   */

  return (
    <Box>
      <Permission>
        <Flex justifyContent="end">
          <Button
            backgroundColor="white"
            leftIcon={<FiPlus />}
            onClick={() => setAdd(true)}
          >
            Add
          </Button>
        </Flex>
      </Permission>
      <CompanyFullList />

      {/* MATERIAL ADD */}
      <Modal isOpen={add} onClose={() => setAdd(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Company</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CompanyCreateForm
              onSuccess={() => {
                setAdd(false);
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CompanySettings;
