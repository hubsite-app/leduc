import React from "react";
import { SimpleGrid, useToast } from "@chakra-ui/react";
import {
  InvoiceCardSnippetFragment,
  InvoiceData,
  useInvoiceUpdateForJobsiteMutation,
} from "../../../generated/graphql";
import { useInvoiceForm } from "../../../forms/invoice";
import SubmitButton from "../../Common/forms/SubmitButton";

interface IInvoiceUpdateForJobsite {
  invoice: InvoiceCardSnippetFragment;
  jobsiteId: string;
  onSuccess?: () => void;
}

const InvoiceUpdateForJobsite = ({
  invoice,
  jobsiteId,
  onSuccess,
}: IInvoiceUpdateForJobsite) => {
  /**
   * ----- Hook Initialization -----
   */

  const toast = useToast();

  const { FormComponents } = useInvoiceForm({
    defaultValues: {
      companyId: invoice.company._id,
      invoiceNumber: invoice.invoiceNumber,
      cost: invoice.cost,
      date: invoice.date,
      description: invoice.description,
      internal: invoice.internal,
    },
  });

  const [update, { loading }] = useInvoiceUpdateForJobsiteMutation();

  /**
   * ----- Functions -----
   */

  const handleSubmit = React.useCallback(
    async (data: InvoiceData) => {
      try {
        const res = await update({
          variables: {
            id: invoice._id,
            jobsiteId,
            data,
          },
        });

        if (res.data?.invoiceUpdateForJobsite) {
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
    [update, invoice._id, jobsiteId, onSuccess, toast]
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

export default InvoiceUpdateForJobsite;
