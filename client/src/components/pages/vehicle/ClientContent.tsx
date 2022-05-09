import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useVehicleFullQuery } from "../../../generated/graphql";
import createLink from "../../../utils/createLink";
import formatNumber from "../../../utils/formatNumber";
import Card from "../../Common/Card";
import Loading from "../../Common/Loading";
import Permission from "../../Common/Permission";
import TextLink from "../../Common/TextLink";
import VehicleRates from "./views/Rates";

interface IVehicleClientContent {
  id: string;
}

const VehicleClientContent = ({ id }: IVehicleClientContent) => {
  /**
   * ----- Hook Initialization -----
   */

  const { data } = useVehicleFullQuery({
    variables: { id },
  });

  return React.useMemo(() => {
    if (data?.vehicle) {
      const { vehicle } = data;

      return (
        <Box>
          <Card heading={<Heading size="md">Info</Heading>}>
            <Text>
              <Text fontWeight="bold" as="span">
                Code:{" "}
              </Text>
              {vehicle.vehicleCode}
            </Text>
            <Text>
              <Text fontWeight="bold" as="span">
                Type:{" "}
              </Text>
              {vehicle.vehicleType}
            </Text>
            <Text>
              <Text fontWeight="bold" as="span">
                Current Rate:{" "}
              </Text>
              ${formatNumber(vehicle.currentRate)}
            </Text>
          </Card>
          <Permission>
            <VehicleRates vehicle={vehicle} />
          </Permission>
          <Card>
            <Heading size="md">Crews</Heading>
            {vehicle.crews.map((crew) => (
              <Box key={crew._id} border="1px solid lightgray" p={2}>
                <TextLink fontWeight="bold" link={createLink.crew(crew._id)}>
                  {crew.name}
                </TextLink>
              </Box>
            ))}
          </Card>
        </Box>
      );
    } else return <Loading />;
  }, [data]);
};

export default VehicleClientContent;
