import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useVehicleFullQuery } from "../../../generated/graphql";
import Card from "../../Common/Card";
import Loading from "../../Common/Loading";

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
          <Card>
            <Heading size="md">Info</Heading>
            <Text>
              <Text fontWeight="bold" as="span">
                Code:{" "}
              </Text>
              {vehicle.vehicleCode}
            </Text>
          </Card>
        </Box>
      );
    } else return <Loading />;
  }, [data]);
};

export default VehicleClientContent;
