import React from "react";

import { Box, Flex, IconButton, SimpleGrid, Text } from "@chakra-ui/react";
import { FiEdit, FiTrash, FiX } from "react-icons/fi";
import { useVehicleWorkUpdateForm } from "../../../../../forms/vehicleWork";
import {
  DailyReportFullDocument,
  useVehicleWorkDeleteMutation,
  useVehicleWorkUpdateMutation,
  VehicleWorkCardSnippetFragment,
  VehicleWorkUpdateData,
} from "../../../../../generated/graphql";
import hourString from "../../../../../utils/hourString";
import SubmitButton from "../../../../Common/forms/SubmitButton";

interface IVehicleWorkCard {
  vehicleWork: VehicleWorkCardSnippetFragment;
}

const VehicleWorkCard = ({ vehicleWork }: IVehicleWorkCard) => {
  /**
   * ----- Hook Initialization -----
   */

  const [edit, setEdit] = React.useState(false);

  const [update, { loading }] = useVehicleWorkUpdateMutation();

  const [remove] = useVehicleWorkDeleteMutation({
    variables: {
      id: vehicleWork._id,
    },
    refetchQueries: [DailyReportFullDocument],
  });

  const { FormComponents } = useVehicleWorkUpdateForm({
    defaultValues: {
      jobTitle: vehicleWork.jobTitle,
      hours: vehicleWork.hours,
    },
  });

  /**
   * ----- Functions -----
   */

  const submitHandler = React.useCallback(
    (data: VehicleWorkUpdateData) => {
      update({
        variables: {
          id: vehicleWork._id,
          data,
        },
      }).then(() => {
        setEdit(false);
      });
    },
    [update, vehicleWork._id]
  );

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
            - {vehicleWork.vehicle ? vehicleWork.vehicle.name : "Not Found"}
          </Text>
          <Text>
            {vehicleWork.hours} {hourString(vehicleWork.hours)}
          </Text>
        </Box>
        <Flex flexDir="row">
          {edit && (
            <IconButton
              backgroundColor="transparent"
              icon={<FiTrash />}
              aria-label="delete"
              onClick={() => window.confirm("Are you sure?") && remove()}
            />
          )}
          <IconButton
            backgroundColor="transparent"
            aria-label="edit"
            icon={edit ? <FiX /> : <FiEdit />}
            onClick={() => setEdit(!edit)}
          />
        </Flex>
      </Flex>

      {edit && (
        <Box backgroundColor="gray.200" p={2} borderRadius={4}>
          <FormComponents.Form submitHandler={submitHandler}>
            <SimpleGrid columns={[1, 1, 2]} spacing={2}>
              <FormComponents.JobTitle
                isLoading={loading}
                backgroundColor="white"
              />
              <FormComponents.Hours
                isLoading={loading}
                backgroundColor="white"
              />
            </SimpleGrid>

            <SubmitButton />
          </FormComponents.Form>
        </Box>
      )}
    </Box>
  );
};

export default VehicleWorkCard;
