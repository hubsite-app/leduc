import { SimpleGrid, useToast } from "@chakra-ui/react";
import React from "react";

import { useJobsiteMaterialCreateForm } from "../../../forms/jobsiteMaterial";
import {
  JobsiteMaterialCreateData,
  useJobsiteAddMaterialMutation,
} from "../../../generated/graphql";
import SubmitButton from "../../Common/forms/SubmitButton";

interface IJobsiteMaterialCreate {
  jobsiteId: string;
  onSuccess?: () => void;
}

const JobsiteMaterialCreate = ({
  jobsiteId,
  onSuccess,
}: IJobsiteMaterialCreate) => {
  /**
   * ----- Hook Initialization -----
   */

  const toast = useToast();

  const { FormComponents } = useJobsiteMaterialCreateForm();

  const [create, { loading }] = useJobsiteAddMaterialMutation();

  /**
   * ----- Functions -----
   */

  const handleSubmit = React.useCallback(
    async (data: JobsiteMaterialCreateData) => {
      try {
        const res = await create({
          variables: {
            jobsiteId,
            data,
          },
        });

        if (res.data?.jobsiteAddMaterial) {
          if (onSuccess) onSuccess();
        } else {
          toast({
            status: "error",
            title: "Error",
            description: "Something went wrong, please try again",
            isClosable: true,
          });
        }
      } catch (e: any) {
        toast({
          status: "error",
          title: "Error",
          description: e.message,
          isClosable: true,
        });
      }
    },
    [create, jobsiteId, onSuccess, toast]
  );

  /**
   * ----- Rendering -----
   */

  return (
    <FormComponents.Form submitHandler={handleSubmit}>
      <SimpleGrid spacing={2} columns={[1, 1, 2]}>
        <FormComponents.Material isLoading={loading} />
        <FormComponents.Supplier isLoading={loading} />
      </SimpleGrid>
      <SimpleGrid spacing={2} columns={[1, 1, 2]}>
        <FormComponents.Quantity isLoading={loading} />
        <FormComponents.Unit isLoading={loading} />
      </SimpleGrid>
      <FormComponents.Rates isLoading={loading} />
      <SubmitButton isLoading={loading} />
    </FormComponents.Form>
  );
};

export default JobsiteMaterialCreate;
