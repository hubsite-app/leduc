import { Box, Center, Flex, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { JobsiteFullSnippetFragment } from "../../../../generated/graphql";
import Card from "../../../Common/Card";
import Permission from "../../../Common/Permission";
import ShowMore from "../../../Common/ShowMore";
import InvoiceCreate from "../../../Forms/Invoice/InvoiceCreate";
import InvoiceCard from "./InvoiceCard";

interface IInvoices {
  jobsite: JobsiteFullSnippetFragment;
}

const Invoices = ({ jobsite }: IInvoices) => {
  /**
   * ----- Hook Initialization -----
   */

  const [addForm, setAddForm] = React.useState(false);

  /**
   * ----- Rendering -----
   */

  return (
    <Card>
      <Flex flexDir="row" justifyContent="space-between">
        <Heading my="auto" ml={2} size="md" w="100%">
          Invoices ({jobsite.invoices.length})
        </Heading>
        <Permission>
          <IconButton
            icon={addForm ? <FiX /> : <FiPlus />}
            aria-label="add"
            backgroundColor="transparent"
            onClick={() => setAddForm(!addForm)}
          />
        </Permission>
      </Flex>
      {addForm && (
        <Box backgroundColor="gray.200" borderRadius={4} p={2} m={2}>
          <InvoiceCreate
            onSuccess={() => setAddForm(false)}
            jobsiteId={jobsite._id}
          />
        </Box>
      )}
      <Flex w="100%" flexDir="column" px={4} py={2}>
        {jobsite.invoices.length > 0 ? (
          <ShowMore
            list={jobsite.invoices.map((invoice) => (
              <InvoiceCard invoice={invoice} key={invoice._id} />
            ))}
          />
        ) : (
          <Center>No Invoices</Center>
        )}
      </Flex>
    </Card>
  );
};

export default Invoices;
