import React from "react";
import { SimpleGrid, useToast } from "@chakra-ui/react";
import {
  InvoiceData,
  useJobsiteAddRevenueInvoiceMutation,
} from "../../../generated/graphql";
import { useInvoiceForm } from "../../../forms/invoice";
import SubmitButton from "../../Common/forms/SubmitButton";

interface IJobsiteRevenueInvoiceCreate {
  jobsiteId: string;
  onSuccess?: () => void;
}

const JobsiteRevenueInvoiceCreate = ({
  jobsiteId,
  onSuccess,
}: IJobsiteRevenueInvoiceCreate) => {
  /**
   * ----- Hook Initialization -----
   */

  const toast = useToast();

  const { FormComponents } = useInvoiceForm();

  const [create, { loading }] = useJobsiteAddRevenueInvoiceMutation();

  /**
   * ----- Functions -----
   */

  const handleSubmit = React.useCallback(
    async (data: InvoiceData) => {
      try {
        const res = await create({
          variables: {
            jobsiteId,
            data,
          },
        });

        if (res.data?.jobsiteAddRevenueInvoice) {
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

export default JobsiteRevenueInvoiceCreate;
