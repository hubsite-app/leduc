import { Center, Flex, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { FiEdit, FiX } from "react-icons/fi";
import { JobsiteFullSnippetFragment } from "../../../../../generated/graphql";
import Card from "../../../../Common/Card";
import TruckingTypeRatesTable from "../../../../Common/Jobsite/TruckingTypeRatesTable";
import Permission from "../../../../Common/Permission";
import JobsiteTruckingRates from "../../../../Forms/Jobsite/JobsiteTruckingRates";

interface ITruckingRates {
  jobsite: JobsiteFullSnippetFragment;
}

const TruckingRates = ({ jobsite }: ITruckingRates) => {
  /**
   * ----- Hook Initialization -----
   */

  const [editForm, setEditForm] = React.useState(false);

  const [collapsed, setCollapsed] = React.useState(false);

  /**
   * ----- Rendering -----
   */

  return (
    <Card h="fit-content">
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
        <Permission>
          <IconButton
            icon={editForm ? <FiX /> : <FiEdit />}
            aria-label="add"
            backgroundColor="transparent"
            onClick={() => setEditForm(!editForm)}
          />
        </Permission>
      </Flex>
      {editForm && (
        <JobsiteTruckingRates
          jobsite={jobsite}
          onSuccess={() => setEditForm(false)}
        />
      )}
      {jobsite.truckingRates.length > 0 ? (
        !collapsed && (
          <TruckingTypeRatesTable truckingRates={jobsite.truckingRates} />
        )
      ) : (
        <Center>Rates not set</Center>
      )}
    </Card>
  );
};

export default TruckingRates;
