import React from "react";
import { Box, Checkbox, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import {
  useCurrentUserCrewQuery,
  VehicleCardSnippetFragment,
} from "../../../generated/graphql";
import Loading from "../../Common/Loading";
import VehicleSearch from "../../Search/VehicleSearch";
import SubmitButton from "../../Common/forms/SubmitButton";

interface IOperatorDailyReportVehicleSelectForm {
  onSubmit?: (vehicleId: string) => void;
}

const OperatorDailyReportVehicleSelectForm = ({
  onSubmit,
}: IOperatorDailyReportVehicleSelectForm) => {
  /**
   * --- Hook Initialization ---
   */

  const { data, loading } = useCurrentUserCrewQuery();

  const [selectedVehicle, setSelectedVehicle] = React.useState<string>();

  /**
   * --- Rendering ---
   */

  const crewVehicles = React.useMemo(() => {
    if (data?.currentUser && !loading) {
      // Collect all unique vehicles from user crews
      const uniqueVehicles = new Map<string, VehicleCardSnippetFragment>();

      for (let i = 0; i < data.currentUser.employee.crews.length; i++) {
        const crew = data.currentUser.employee.crews[i];

        for (let vehicle of crew.vehicles) {
          uniqueVehicles.set(vehicle._id, vehicle);
        }
      }

      const content: React.ReactChild[] = [];

      uniqueVehicles.forEach((vehicle) =>
        content.push(
          <Checkbox
            key={vehicle._id}
            onChange={() => setSelectedVehicle(vehicle._id)}
            isChecked={selectedVehicle === vehicle._id}
            isDisabled={loading}
          >
            {vehicle.name}
          </Checkbox>
        )
      );

      return (
        <Box>
          <Text as="i">Select from existing:</Text>
          <SimpleGrid columns={[2, 2, 4]} m={2} spacing={2}>
            {content}
          </SimpleGrid>
          <Box w="100%">
            <Text textAlign="center">or</Text>
          </Box>
        </Box>
      );
    } else return <Loading />;
  }, [data?.currentUser, loading, selectedVehicle]);

  return (
    <form>
      <Heading size="sm">Vehicle Selection</Heading>
      {crewVehicles}
      <VehicleSearch
        label="Search all vehicles"
        placeholder="Search"
        vehicleSelected={(vehicle) => {
          setSelectedVehicle(vehicle._id);
        }}
      />

      <SubmitButton>Create Report</SubmitButton>
    </form>
  );
};

export default OperatorDailyReportVehicleSelectForm;
