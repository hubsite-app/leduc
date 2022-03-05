import React from "react";

import { Document, Page, View, Text, PDFViewer } from "@react-pdf/renderer";
import { Box } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import {
  PageDailyReportPdfComp,
  ssrDailyReportPdf,
} from "../../../generated/page";
import Loading from "../../../components/Common/Loading";
import ClientOnly from "../../../components/Common/ClientOnly";

const DailyReportPDF: PageDailyReportPdfComp = ({ data }) => {
  return React.useMemo(() => {
    if (data?.dailyReport) {
      const { dailyReport } = data;

      return (
        <ClientOnly>
          <Box w="100%" minH="90vh">
            <PDFViewer height="100%" width="100%">
              <Document>
                <Page size="A4" orientation="landscape">
                  <View>
                    <Text>{dailyReport.jobsite.name}</Text>
                  </View>
                </Page>
              </Document>
            </PDFViewer>
          </Box>
        </ClientOnly>
      );
    } else return <Loading />;
  }, [data]);
};

export default DailyReportPDF;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  ...ctx
}) => {
  console.log(params);

  const res = await ssrDailyReportPdf.getServerPage(
    { variables: { id: params?.id as string } },
    ctx
  );

  let notFound = false;
  if (!res.props.data.dailyReport) notFound = true;

  return { ...res, notFound };
};
