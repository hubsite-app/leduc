import React from "react";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { InvoiceCardSnippetFragment } from "../../../../../generated/graphql";
import formatNumber from "../../../../../utils/formatNumber";
import { FiEdit, FiX } from "react-icons/fi";
import InvoiceUpdateForJobsite from "../../../../Forms/Invoice/InvoiceUpdateForJobsite";
import Permission from "../../../../Common/Permission";
import FormContainer from "../../../../Common/FormContainer";

interface IInvoiceCardForJobsite {
  invoice: InvoiceCardSnippetFragment;
  jobsiteId: string;
}

const InvoiceCardForJobsite = ({
  invoice,
  jobsiteId,
}: IInvoiceCardForJobsite) => {
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
          <InvoiceUpdateForJobsite invoice={invoice} jobsiteId={jobsiteId} />
        </FormContainer>
      )}
    </Box>
  );
};

export default InvoiceCardForJobsite;
