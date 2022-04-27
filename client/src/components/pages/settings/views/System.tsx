import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useSystem } from "../../../../contexts/System";
import InfoTooltip from "../../../Common/Info";
import Loading from "../../../Common/Loading";
import SystemCompanyVehicleTypeDefaults from "../../../Common/System/CompanyVehicleTypeDefaults";
import SystemLaborTypes from "../../../Common/System/LaborTypes";
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
          <Flex flexDir="row" justifyContent="start">
            <Heading>System</Heading>
            <InfoTooltip description="General system settings that allow updating defaults and list options around the app" />
          </Flex>
          <SystemUnits system={system} />
          <SystemLaborTypes system={system} />
          <SystemMaterialShipmentVehicleTypeDefaults system={system} />
          <SystemCompanyVehicleTypeDefaults system={system} />
        </Box>
      );
    } else return <Loading />;
  }, [system]);
};

export default SystemSettings;
