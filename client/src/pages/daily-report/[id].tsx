import { Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import ClientOnly from "../../components/Common/ClientOnly";
import Container from "../../components/Common/Container";
import DailyReportClientContent from "../../components/pages/daily-reports/id/ClientContent";
import {
  PageDailyReportSsrComp,
  ssrDailyReportSsr,
} from "../../generated/page";

const DailyReport: PageDailyReportSsrComp = ({ data }) => {
  return (
    <Container>
      <Heading>
        {data?.dailyReport.jobsite.jobcode}: {data?.dailyReport.jobsite.name}
      </Heading>
      <ClientOnly>
        <DailyReportClientContent id={data?.dailyReport._id!} />
      </ClientOnly>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  ...ctx
}) => {
  const res = await ssrDailyReportSsr.getServerPage(
    { variables: { id: params?.id as string } },
    ctx
  );

  let notFound = false;
  if (!res.props.data.dailyReport) notFound = true;

  return { ...res, notFound };
};

export default DailyReport;
