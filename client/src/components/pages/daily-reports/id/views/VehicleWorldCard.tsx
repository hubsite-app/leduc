import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { useVehicleWorkUpdateForm } from "../../../../../forms/vehicleWork";
import {
  useVehicleWorkUpdateMutation,
  VehicleWorkCardSnippetFragment,
} from "../../../../../generated/graphql";
import hourString from "../../../../../utils/hourString";

interface IVehicleWorkCard {
  vehicleWork: VehicleWorkCardSnippetFragment;
}

const VehicleWorkCard = ({ vehicleWork }: IVehicleWorkCard) => {
  /**
   * ----- Hook Initialization -----
   */

  const [update, { loading }] = useVehicleWorkUpdateMutation();

  const { FormComponents } = useVehicleWorkUpdateForm();

  /**
   * ----- Rendering -----
   */

  return (
    <Box p={2} w="100%" border="1px solid lightgray">
      <Flex flexDir="row" justifyContent="space-between">
        <Box>
          <Text>
            <Text as="span" fontWeight="bold">
              {vehicleWork.jobTitle}
            </Text>{" "}
            - {vehicleWork.vehicle.name}
          </Text>
          <Text>
            {vehicleWork.hours} {hourString(vehicleWork.hours)}
          </Text>
        </Box>
        <Flex flexDir="row">
          <IconButton
            backgroundColor="transparent"
            aria-label="edit"
            icon={<FiEdit />}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default VehicleWorkCard;
