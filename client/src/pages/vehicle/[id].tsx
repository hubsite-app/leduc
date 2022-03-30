import { Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import ClientOnly from "../../components/Common/ClientOnly";
import Container from "../../components/Common/Container";
import VehicleClientContent from "../../components/pages/vehicle/ClientContent";
import { PageVehicleSsrComp, ssrVehicleSsr } from "../../generated/page";

const Vehicle: PageVehicleSsrComp = ({ data }) => {
  const vehicle = data?.vehicle!;

  return (
    <Container>
      <Heading size="md">
        {vehicle.name} ({vehicle.vehicleCode})
      </Heading>
      <ClientOnly>
        <VehicleClientContent id={vehicle._id} />
      </ClientOnly>
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
