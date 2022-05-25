import {
  BoxProps,
  Flex,
  Heading,
  Icon,
  IconButton,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FiDownload, FiRefreshCw } from "react-icons/fi";
import {
  ReportIssueSnippetFragment,
  useJobsiteRequestReportGenerationMutation,
} from "../../generated/graphql";
import formatNumber from "../../utils/formatNumber";
import Card from "./Card";
import JobsiteReportIssues from "./JobsiteReport/Issues";

interface IReportSummaryCard extends BoxProps {
  revenue: {
    internal: number;
    external: number;
  };
  revenueTooltip?: React.ReactNode;
  internalExpenses: number;
  internalExpensesTooltip?: React.ReactNode;
  totalExpenses: number;
  totalExpensesTooltip?: React.ReactNode;
  netIncome: number;
  netIncomeTooltip?: React.ReactNode;
  showRevenueBreakdown?: boolean;
  issues?: ReportIssueSnippetFragment[];
  excelDownloadUrl?: string | null;
  jobsiteId?: string;
}

const ReportSummaryCard = ({
  internalExpenses,
  internalExpensesTooltip,
  netIncome,
  netIncomeTooltip,
  revenue,
  revenueTooltip,
  totalExpenses,
  totalExpensesTooltip,
  issues,
  excelDownloadUrl,
  jobsiteId,
  showRevenueBreakdown = true,
  ...props
}: IReportSummaryCard) => {
  /**
   * ----- Hook Initialization -----
   */

  const toast = useToast({
    isClosable: true,
  });

  const [request, { loading }] = useJobsiteRequestReportGenerationMutation();

  /**
   * ----- Functions -----
   */

  const handleRefreshRequest = React.useCallback(async () => {
    if (jobsiteId) {
      try {
        const res = await request({
          variables: {
            id: jobsiteId,
          },
        });

        if (res.data?.jobsiteRequestReportGeneration) {
          toast({
            status: "success",
            title: "Success",
            description:
              "This report should be refreshed in the next few minutes.",
          });
        } else {
          toast({
            status: "error",
            title: "Error",
            description: "Something went wrong, please try again.",
          });
        }
      } catch (e: any) {
        toast({
          status: "error",
          title: "Error",
          description: e.message,
        });
      }
    } else {
      toast({
        status: "error",
        title: "Error",
        description: "Unable to do this",
      });
    }
  }, [jobsiteId, request, toast]);

  /**
   * ----- Rendering -----
   */

  return (
    <Card
      heading={
        <Flex flexDir="row" justifyContent="space-between">
          <Heading size="md">Summary</Heading>
          <Flex flexDir="row">
            {jobsiteId && (
              <Tooltip label="Refresh report">
                <IconButton
                  icon={<FiRefreshCw />}
                  size="sm"
                  aria-label="refresh"
                  backgroundColor="transparent"
                  onClick={() => handleRefreshRequest()}
                  isLoading={loading}
                />
              </Tooltip>
            )}
            {excelDownloadUrl && (
              <Tooltip label="Download excel">
                <Link href={excelDownloadUrl} passHref>
                  <Icon
                    m="auto"
                    mr={2}
                    cursor="pointer"
                    as={FiDownload}
                    backgroundColor="transparent"
                  />
                </Link>
              </Tooltip>
            )}
            {issues && <JobsiteReportIssues issues={issues} />}
          </Flex>
        </Flex>
      }
      {...props}
    >
      <SimpleGrid spacing={2} columns={[4]}>
        <Stat display="flex" justifyContent="center">
          <Tooltip placement="top" label={revenueTooltip}>
            <StatLabel>Total Revenue</StatLabel>
          </Tooltip>
          <StatNumber>
            ${formatNumber(revenue.external + revenue.internal)}
          </StatNumber>
          {showRevenueBreakdown ? (
            <>
              <StatHelpText mb={0}>
                ${formatNumber(revenue.external)} external
              </StatHelpText>
              <StatHelpText>
                ${formatNumber(revenue.internal)} internal
              </StatHelpText>
            </>
          ) : null}
        </Stat>
        <Stat display="flex" justifyContent="center">
          <Tooltip placement="top" label={internalExpensesTooltip}>
            <StatLabel>Internal Expenses</StatLabel>
          </Tooltip>
          <StatNumber>${formatNumber(internalExpenses)}</StatNumber>
        </Stat>

        <Stat display="flex" justifyContent="center">
          <Tooltip placement="top" label={totalExpensesTooltip}>
            <StatLabel>Total Expenses</StatLabel>
          </Tooltip>
          <StatNumber>${formatNumber(totalExpenses)}</StatNumber>
        </Stat>

        <Stat display="flex" justifyContent="center">
          <Tooltip placement="top" label={netIncomeTooltip}>
            <StatLabel>Net Income</StatLabel>
          </Tooltip>
          <StatNumber color={netIncome < 0 ? "red.500" : undefined}>
            {netIncome < 0 && "("}${formatNumber(Math.abs(netIncome))}
            {netIncome < 0 && ")"}
          </StatNumber>
        </Stat>
      </SimpleGrid>
    </Card>
  );
};

export default ReportSummaryCard;
