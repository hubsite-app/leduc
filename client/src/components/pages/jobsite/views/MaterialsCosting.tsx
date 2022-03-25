import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useJobsiteMaterialCreateForm } from "../../../../forms/jobsite";

import { JobsiteFullSnippetFragment } from "../../../../generated/graphql";
import Card from "../../../Common/Card";

interface IJobsiteMaterialsCosting {
  jobsite: JobsiteFullSnippetFragment;
}

const JobsiteMaterialsCosting = ({ jobsite }: IJobsiteMaterialsCosting) => {
  /**
   * ----- Hook Initialization -----
   */

  const [collapsed, setCollapsed] = React.useState(true);

  const { FormComponents } = useJobsiteMaterialCreateForm();

  /**
   * ----- Rendering -----
   */

  return (
    <Card>
      <Heading
        w="100%"
        size="md"
        ml={2}
        cursor="pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        Materials
      </Heading>
      <Flex flexDir="row">
        <FormComponents.Form submitHandler={() => {}}>
          <FormComponents.Material />
          <FormComponents.Supplier />
          <FormComponents.Quantity />
          <FormComponents.Unit />
          <FormComponents.Rate />
        </FormComponents.Form>
      </Flex>
    </Card>
  );
};

export default JobsiteMaterialsCosting;
