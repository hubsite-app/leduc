import React from "react";
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
import { FiPlus } from "react-icons/fi";
import MaterialFullList from "../../../Common/Material/FullList";
import MaterialCreateForm from "../../../Forms/Material/MaterialCreate";
import AdminOnly from "../../../Common/AdminOnly";

const MaterialSettings = () => {
  /**
   * ----- Hook Initialization -----
   */

  const [add, setAdd] = React.useState(false);

  /**
   * ----- Rendering -----
   */

  return (
    <Box>
      <AdminOnly>
        <Flex justifyContent="end">
          <Button
            backgroundColor="white"
            leftIcon={<FiPlus />}
            onClick={() => setAdd(true)}
          >
            Add
          </Button>
        </Flex>
      </AdminOnly>
      <MaterialFullList />

      {/* MATERIAL ADD */}
      <Modal isOpen={add} onClose={() => setAdd(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Material</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MaterialCreateForm
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

export default MaterialSettings;
