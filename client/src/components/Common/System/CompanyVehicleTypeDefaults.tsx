import { Flex, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { FiEdit, FiX } from "react-icons/fi";
import { SystemSnippetFragment } from "../../../generated/graphql";
import SystemCompanyVehicleTypeUpdate from "../../Forms/System/SystemCompanyVehicleTypeUpdate";
import Card from "../Card";
import DefaultRatesTable from "../DefaultRatesTable";
import Permission from "../Permission";

interface ISystemCompanyVehicleTypeDefaults {
  system: SystemSnippetFragment;
}

const SystemCompanyVehicleTypeDefaults = ({
  system,
}: ISystemCompanyVehicleTypeDefaults) => {
  /**
   * ----- Hook Initialization -----
   */

  const [edit, setEdit] = React.useState(false);

  const [collapsed, setCollapsed] = React.useState(true);

  /**
   * ----- Rendering -----
   */

  return (
    <Card>
      <Flex flexDir="row" justifyContent="space-between">
        <Heading
          my="auto"
          ml={2}
          size="md"
          w="100%"
          cursor="pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          Company Vehicle Type Rates
        </Heading>
        <Permission>
          <IconButton
            aria-label="edit"
            icon={edit ? <FiX /> : <FiEdit />}
            backgroundColor="transparent"
            onClick={() => setEdit(!edit)}
          />
        </Permission>
      </Flex>
      {edit && (
        <SystemCompanyVehicleTypeUpdate
          system={system}
          onSuccess={() => setEdit(false)}
        />
      )}
      {!collapsed && (
        <DefaultRatesTable defaultRates={system.companyVehicleTypeDefaults} />
      )}
    </Card>
  );
};

export default SystemCompanyVehicleTypeDefaults;
