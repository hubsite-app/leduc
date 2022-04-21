import {
  Box,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FiEdit } from "react-icons/fi";
import ClientOnly from "../../components/Common/ClientOnly";
import Container from "../../components/Common/Container";
import Permission from "../../components/Common/Permission";
import CrewUpdateForm from "../../components/Forms/Crew/Update";
import CrewClientContent from "../../components/pages/crews/id/ClientContent";
import { UserRoles } from "../../generated/graphql";
import { PageCrewSsrComp, ssrCrewSsr } from "../../generated/page";

const Crew: PageCrewSsrComp = ({ data }) => {
  const crew = data!.crew!;

  /**
   * ----- Hook Initialization -----
   */

  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  /**
   * ----- Rendering -----
   */

  return (
    <Container>
      <Flex flexDir="row" justifyContent="space-between">
        <Box>
          <Heading>{crew.name}</Heading>
          <Heading size="md">{crew.type} Crew</Heading>
        </Box>
        <Permission minRole={UserRoles.Admin}>
          <IconButton
            aria-label="edit"
            backgroundColor="transparent"
            icon={<FiEdit />}
            onClick={() => onOpen()}
          />
        </Permission>
      </Flex>
      <ClientOnly>
        <CrewClientContent id={crew._id} />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Crew Edit</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CrewUpdateForm
                crew={crew}
                onSuccess={() => {
                  onClose();
                  router.reload();
                }}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </ClientOnly>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  ...ctx
}) => {
  const res = await ssrCrewSsr.getServerPage(
    { variables: { id: params?.id as string } },
    ctx
  );

  let notFound = false;
  if (!res.props.data.crew) notFound = true;

  return { ...res, notFound };
};

export default Crew;
