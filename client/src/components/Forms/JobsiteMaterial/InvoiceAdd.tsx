import { SimpleGrid, useToast } from "@chakra-ui/react";
import React from "react";
import { useInvoiceForm } from "../../../forms/invoice";
import {
  InvoiceData,
  JobsiteMaterialCardSnippetFragment,
  useJobsiteMaterialAddInvoiceMutation,
} from "../../../generated/graphql";
import SubmitButton from "../../Common/forms/SubmitButton";

interface IJobsiteMaterialInvoiceAddForm {
  jobsiteMaterial: JobsiteMaterialCardSnippetFragment;
  onSuccess?: () => void;
}

const JobsiteMaterialInvoiceAddForm = ({
  jobsiteMaterial,
  onSuccess,
}: IJobsiteMaterialInvoiceAddForm) => {
  /**
   * ----- Hook Initialization -----
   */

  const toast = useToast();

  const { FormComponents } = useInvoiceForm();

  const [add, { loading }] = useJobsiteMaterialAddInvoiceMutation();

  /**
   * ----- Functions -----
   */

  const handleSubmit = React.useCallback(
    async (data: InvoiceData) => {
      try {
        const res = await add({
          variables: {
            id: jobsiteMaterial._id,
            data,
          },
        });

        if (res.data?.jobsiteMaterialAddInvoice) {
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
    [add, jobsiteMaterial._id, onSuccess, toast]
  );

  /**
   * ----- Rendering -----
   */

  return (
    <FormComponents.Form submitHandler={handleSubmit}>
      <FormComponents.Company isLoading={loading} />

      <SimpleGrid spacing={2} columns={[1, 1, 3]}>
        <FormComponents.Cost isLoading={loading} />
        <FormComponents.InvoiceNumber isLoading={loading} />
        <FormComponents.Date isLoading={loading} />
      </SimpleGrid>

      <FormComponents.Description isLoading={loading} />
      <FormComponents.Internal isLoading={loading} />

      <SubmitButton isLoading={loading} />
    </FormComponents.Form>
  );
};

export default JobsiteMaterialInvoiceAddForm;
