import { Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Container from "../../components/Common/Container";
import { PageVehicleSsrComp, ssrVehicleSsr } from "../../generated/page";

const Vehicle: PageVehicleSsrComp = ({ data }) => {
  const vehicle = data?.vehicle!;

  return (
    <Container>
      <Heading size="md">
        {vehicle.name} ({vehicle.vehicleCode})
      </Heading>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  ...ctx
}) => {
  const res = await ssrVehicleSsr.getServerPage(
    { variables: { id: params?.id as string } },
    ctx
  );

  let notFound = false;
  if (!res.props.data.vehicle) notFound = true;

  return { ...res, notFound };
};

export default Vehicle;
