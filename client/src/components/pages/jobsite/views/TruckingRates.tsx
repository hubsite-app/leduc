import { Flex, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { FiEdit, FiX } from "react-icons/fi";
import { JobsiteFullSnippetFragment } from "../../../../generated/graphql";
import Card from "../../../Common/Card";
import DefaultsTable from "../../../Common/DefaultRatesTable";
import JobsiteTruckingRates from "../../../Forms/Jobsite/JobsiteTruckingRates";

interface ITruckingRates {
  jobsite: JobsiteFullSnippetFragment;
}

const TruckingRates = ({ jobsite }: ITruckingRates) => {
  /**
   * ----- Hook Initialization -----
   */

  const [editForm, setEditForm] = React.useState(false);

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
          Trucking Rates
        </Heading>
        <IconButton
          icon={editForm ? <FiX /> : <FiEdit />}
          aria-label="add"
          backgroundColor="transparent"
          onClick={() => setEditForm(!editForm)}
        />
      </Flex>
      {editForm && (
        <JobsiteTruckingRates
          jobsite={jobsite}
          onSuccess={() => setEditForm(false)}
        />
      )}
      {!collapsed && <DefaultsTable defaultRates={jobsite.truckingRates} />}
    </Card>
  );
};

export default TruckingRates;
