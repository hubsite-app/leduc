import { Box } from "@chakra-ui/react";
import { InvoiceFullSnippetFragment } from "../../../generated/graphql";
import createLink from "../../../utils/createLink";
import jobsiteName from "../../../utils/jobsiteName";
import TextLink from "../TextLink";
import InvoiceCardContent from "./CardContent";

interface IInvoiceFullCard {
  invoice: InvoiceFullSnippetFragment;
}

const InvoiceFullCard = ({ invoice }: IInvoiceFullCard) => {
  return (
    <Box borderRadius="6" backgroundColor="white" m="2" p="2">
      <InvoiceCardContent invoice={invoice} />
      {invoice.jobsite ? (
        <TextLink
          link={createLink.jobsite(invoice.jobsite._id, {
            jobsiteMaterialId: invoice.jobsiteMaterial?._id,
          })}
        >
          {jobsiteName(invoice.jobsite.name, invoice.jobsite.jobcode)}
        </TextLink>
      ) : null}
    </Box>
  );
};

export default InvoiceFullCard;
