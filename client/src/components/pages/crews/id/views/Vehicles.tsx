import { Flex, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { FiPlus, FiX } from "react-icons/fi";

import {
  CrewFullSnippetFragment,
  VehicleCardSnippetFragment,
} from "../../../../../generated/graphql";
import Card from "../../../../Common/Card";
import VehicleAddForm from "./VehicleAddForm";
import VehicleCard from "./VehicleCard";

interface IVehicles {
  vehicles: VehicleCardSnippetFragment[];
  crew: CrewFullSnippetFragment;
}

const Vehicles = ({ vehicles, crew }: IVehicles) => {
  /**
   * ----- Hook Initialization -----
   */

  const [addForm, setAddForm] = React.useState(false);

  const [collapsed, setCollapsed] = React.useState(true);

  /**
   * ----- Rendering -----
   */

  return (
    <Card>
      <Flex flexDir="row" justifyContent="space-between">
        <Heading
          w="100%"
          my="auto"
          size="md"
          cursor="pointer"
          ml={1}
          onClick={() => setCollapsed(!collapsed)}
        >
          Vehicles ({vehicles.length})
        </Heading>
        <IconButton
          aria-label="add"
          backgroundColor="transparent"
          icon={addForm ? <FiX /> : <FiPlus />}
          onClick={() => setAddForm(!addForm)}
        />
      </Flex>

      {addForm && (
        <VehicleAddForm crew={crew} closeForm={() => setAddForm(false)} />
      )}

      {!collapsed && (
        <Flex flexDir="column" w="100%" px={4} py={2}>
          {vehicles.map((vehicle) => (
            <VehicleCard vehicle={vehicle} crew={crew} key={vehicle._id} />
          ))}
        </Flex>
      )}
    </Card>
  );
};

export default Vehicles;
