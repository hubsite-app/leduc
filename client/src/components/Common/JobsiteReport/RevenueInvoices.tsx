import {
  Box,
  Heading,
  Table,
  TableCaption,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import {
  JobsiteMonthReportFullSnippetFragment,
  JobsiteYearReportFullSnippetFragment,
} from "../../../generated/graphql";
import formatNumber from "../../../utils/formatNumber";
import Card from "../../Common/Card";

interface IJobsiteReportRevenueInvoices {
  report:
    | JobsiteMonthReportFullSnippetFragment
    | JobsiteYearReportFullSnippetFragment;
}

const JobsiteReportRevenueInvoices = ({
  report,
}: IJobsiteReportRevenueInvoices) => {
  /**
   * ----- Hook Inititalization -----
   */

  const [collapsed, setCollapsed] = React.useState(true);

  /**
   * ----- Rendering -----
   */

  return (
    <Card>
      <Heading
        size="md"
        m={2}
        w="100%"
        cursor="pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        Revenue Invoices ({report.revenueInvoices.length})
      </Heading>
      {!collapsed && (
        <Box
          w="100%"
          overflowX="scroll"
          backgroundColor="gray.200"
          borderRadius={4}
          m={2}
        >
          <Table variant="striped" colorScheme="red">
            <TableCaption>Revenue costing</TableCaption>
            <Thead>
              <Tr>
                <Th>Invoice</Th>
                <Th isNumeric>Cost</Th>
              </Tr>
            </Thead>
            <Tbody>
              {report.revenueInvoices.map((reports) => (
                <Tr key={reports._id}>
                  <Th>
                    {reports.invoice.company.name}{" "}
                    {reports.invoice.invoiceNumber}{" "}
                    {reports.invoice.internal && "(internal)"}
                  </Th>
                  <Th isNumeric>${formatNumber(reports.value)}</Th>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Totals</Th>
                <Th isNumeric>
                  $
                  {formatNumber(
                    report.summary.externalRevenueInvoiceValue +
                      report.summary.internalRevenueInvoiceValue
                  )}
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </Box>
      )}
    </Card>
  );
};

export default JobsiteReportRevenueInvoices;
