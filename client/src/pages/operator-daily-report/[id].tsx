import React from "react";

import { GetServerSideProps } from "next";
import {
  PageOperatorDailyReportCardComp,
  ssrOperatorDailyReportCard,
} from "../../generated/page";
import Container from "../../components/Common/Container";
import Breadcrumbs from "../../components/Common/Breadcrumbs";
import operatorDailyReportName from "../../utils/operatorDailyReportName";

const OperatorDailyReport: PageOperatorDailyReportCardComp = ({ data }) => {
  const operatorDailyReport = data?.operatorDailyReport!;

  return (
    <Container>
      <Breadcrumbs
        crumbs={[
          {
            title: "Operator Daily Reports",
            link: "/operator-daily-reports",
          },
          {
            title: operatorDailyReportName(operatorDailyReport),
            isCurrentPage: true,
          },
        ]}
      />
      Operator Daily Report
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  ...ctx
}) => {
  const res = await ssrOperatorDailyReportCard.getServerPage(
    { variables: { id: params?.id as string } },
    ctx
  );

  let notFound = false;
  if (!res.props.data.operatorDailyReport) notFound = true;

  return { ...res, notFound };
};

export default OperatorDailyReport;
