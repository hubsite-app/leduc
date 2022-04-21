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
import dayjs from "dayjs";
import EmployeeWorkTable from "../../../components/pages/daily-reports/pdf/EmployeeWorkTable";
import VehicleWorkTable from "../../../components/pages/daily-reports/pdf/VehicleWorkTable";
import ProductionTable from "../../../components/pages/daily-reports/pdf/ProductionTable";
import MaterialShipmentTable from "../../../components/pages/daily-reports/pdf/MaterialShipmentTable";

const DailyReportPDF: PageDailyReportPdfComp = ({ data }) => {
  return React.useMemo(() => {
    if (data?.dailyReport) {
      const { dailyReport } = data;

      return (
        <ClientOnly>
          <Box w="100%" minH="90vh">
            <PDFViewer height="100%" width="100%">
              <Document
                title={`${dailyReport.jobsite.jobcode}_${dailyReport.crew.name
                  .replace("'", "")
                  .replace(" ", "-")}_${dayjs(dailyReport.date).format(
                  "YYYY-MM-DD"
                )}`}
              >
                <Page
                  size="A4"
                  orientation="landscape"
                  style={{ margin: "5px" }}
                >
                  <View wrap={false}>
                    <Text style={{ fontSize: "15px", fontWeight: "thin" }}>
                      <Text style={{ fontWeight: "extrabold" }}>
                        {dailyReport.jobsite.name} (
                        {dailyReport.jobsite.jobcode})
                      </Text>
                      <Text>
                        {" - "}
                        {dailyReport.crew.name},
                      </Text>
                      <Text>
                        {" "}
                        {dayjs(dailyReport.date).format("MMMM D, YYYY")}
                      </Text>
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "5px",
                      }}
                    >
                      <EmployeeWorkTable
                        employeeWorks={dailyReport.employeeWork}
                      />
                      <VehicleWorkTable
                        vehicleWorks={dailyReport.vehicleWork}
                      />
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "5px",
                      }}
                    >
                      <ProductionTable productions={dailyReport.productions} />
                      <MaterialShipmentTable
                        materialShipments={dailyReport.materialShipments}
                      />
                    </View>
                    <View>
                      <Text style={{ fontSize: "10px" }}>Notes</Text>
                      <Text style={{ fontSize: "7px" }}>
                        {dailyReport.reportNote?.note}
                      </Text>
                    </View>
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
  const res = await ssrDailyReportPdf.getServerPage(
    { variables: { id: params?.id as string } },
    ctx
  );

  let notFound = false;
  if (!res.props.data.dailyReport) notFound = true;

  return { ...res, notFound };
};
