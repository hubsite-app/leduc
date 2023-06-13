import { Box, Heading } from "@chakra-ui/react";
import {
  CompanyCardSnippetFragment,
  useCompanyFullQuery,
} from "../../../generated/graphql";
import CompanyMaterialReports from "../../Common/Company/MaterialReport";
import InvoiceFullCard from "../../Common/Invoice/CardFull";
import Loading from "../../Common/Loading";

interface ICompanyClientContent {
  company: CompanyCardSnippetFragment;
}

const CompanyClientContent = ({ company }: ICompanyClientContent) => {
  /**
   * ----- Hook Initialization -----
   */

  const { data, loading } = useCompanyFullQuery({
    variables: {
      id: company._id,
    },
  });

  /**
   * ----- Render -----
   */

  if (data?.company && !loading) {
    return (
      <div>
        <CompanyMaterialReports
          materialReports={data.company.materialReports}
        />
        <Heading size="md">Invoices</Heading>
        <Box borderRadius="6" p="2" backgroundColor="gray.200">
          {data.company.invoices.map((invoice) => (
            <InvoiceFullCard invoice={invoice} key={invoice._id} />
          ))}
        </Box>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default CompanyClientContent;
