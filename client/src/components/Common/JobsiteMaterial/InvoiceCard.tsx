import React from "react";
import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { FiEdit, FiX } from "react-icons/fi";
import { InvoiceCardSnippetFragment } from "../../../generated/graphql";
import Permission from "../Permission";
import formatNumber from "../../../utils/formatNumber";
import FormContainer from "../FormContainer";
import InvoiceUpdateForJobsiteMaterial from "../../Forms/Invoice/UpdateForJobsiteMaterial";

interface IInvoiceCardForJobsiteMaterial {
  invoice: InvoiceCardSnippetFragment;
  jobsiteMaterialId: string;
}

const InvoiceCardForJobsiteMaterial = ({
  invoice,
  jobsiteMaterialId,
}: IInvoiceCardForJobsiteMaterial) => {
  /**
   * ----- Hook Initialization -----
   */

  const [edit, setEdit] = React.useState(false);

  return (
    <Box p={2} w="100%" border="1px solid lightgray">
      <Flex flexDir="row" justifyContent="space-between">
        <Text>
          <Text as="span">
            <Text fontWeight="bold" as="span">
              {invoice.company.name} #{invoice.invoiceNumber}
            </Text>
            <Text as="span"> - ${formatNumber(invoice.cost)}</Text>
          </Text>
          <Text whiteSpace="pre-wrap">{invoice.description}</Text>
        </Text>
        <Permission>
          <IconButton
            backgroundColor="transparent"
            aria-label="edit"
            icon={edit ? <FiX /> : <FiEdit />}
            onClick={() => setEdit(!edit)}
          />
        </Permission>
      </Flex>
      {edit && (
        <FormContainer>
          <Flex justifyContent="space-between">
            <Heading ml={1} my="auto" size="md">
              Edit Invoice
            </Heading>
            <IconButton
              icon={<FiX />}
              aria-label="exit"
              onClick={() => setEdit(false)}
              size="sm"
              backgroundColor="transparent"
            />
          </Flex>
          <InvoiceUpdateForJobsiteMaterial
            invoice={invoice}
            jobsiteMaterialId={jobsiteMaterialId}
            onSuccess={() => setEdit(false)}
          />
        </FormContainer>
      )}
    </Box>
  );
};

export default InvoiceCardForJobsiteMaterial;
