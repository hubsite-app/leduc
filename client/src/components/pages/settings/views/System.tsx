import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useSystem } from "../../../../contexts/System";
import Loading from "../../../Common/Loading";
import SystemCompanyVehicleTypeDefaults from "../../../Common/System/CompanyVehicleTypeDefaults";
import SystemMaterialShipmentVehicleTypeDefaults from "../../../Common/System/MaterialShipmentVehicleTypeDefaults";
import SystemUnits from "../../../Common/System/Units";

const SystemSettings = () => {
  /**
   * ----- Hook Initialization -----
   */

  const {
    state: { system },
  } = useSystem();

  /**
   * ----- Rendering -----
   */

  return React.useMemo(() => {
    if (system) {
      return (
        <Box>
          <Flex flexDir="row" justifyContent="space-between">
            <Heading size="md">System</Heading>
          </Flex>
          <SystemUnits system={system} />
          <SystemMaterialShipmentVehicleTypeDefaults system={system} />
          <SystemCompanyVehicleTypeDefaults system={system} />
        </Box>
      );
    } else return <Loading />;
  }, [system]);
};

export default SystemSettings;
