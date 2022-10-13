import { GetServerSideProps } from "next";
import { PageCompanyFullComp, ssrCompanyFull } from "../../generated/page";
import Container from "../../components/Common/Container";
import CompanyMaterialReport from "../../components/Common/Company/MaterialReport";
import { Heading, Box } from "@chakra-ui/react";

const Company: PageCompanyFullComp = ({ data }) => {
  const company = data!.company;

  return (
    <Container>
      <Heading>{company.name}</Heading>
      <Box>
        <Heading size="md">Material Report</Heading>
        <CompanyMaterialReport materialReports={company.materialReports} />
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  ...ctx
}) => {
  const res = await ssrCompanyFull.getServerPage(
    { variables: { id: params?.id as string } },
    ctx
  );

  let notFound = false;
  if (!res.props.data.company) notFound = true;

  return { ...res, notFound };
};

export default Company;
