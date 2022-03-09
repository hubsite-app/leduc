import { Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import ClientOnly from "../../components/Common/ClientOnly";
import Container from "../../components/Common/Container";
import CrewClientContent from "../../components/pages/crews/id/ClientContent";
import { PageCrewSsrComp, ssrCrewSsr } from "../../generated/page";

const Crew: PageCrewSsrComp = ({ data }) => {
  const crew = data!.crew!;

  return (
    <Container>
      <Heading>{crew.name}</Heading>
      <Heading size="md">{crew.type} Crew</Heading>
      <ClientOnly>
        <CrewClientContent id={crew._id} />
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
