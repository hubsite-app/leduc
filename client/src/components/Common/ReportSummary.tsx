import {
  BoxProps,
  Heading,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import formatNumber from "../../utils/formatNumber";
import Card from "./Card";

interface IReportSummaryCard extends BoxProps {
  revenue: {
    internal: number;
    external: number;
  };
  internalExpenses: number;
  totalExpenses: number;
  netIncome: number;
  showRevenueBreakdown?: boolean;
}

const ReportSummaryCard = ({
  internalExpenses,
  netIncome,
  revenue,
  totalExpenses,
  showRevenueBreakdown = true,
  ...props
}: IReportSummaryCard) => {
  return (
    <Card heading={<Heading size="md">Summary</Heading>} {...props}>
      <SimpleGrid spacing={2} columns={[4]}>
        <Stat display="flex" justifyContent="center">
          <StatLabel>Total Revenue</StatLabel>
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
          <StatLabel>Internal Expenses</StatLabel>
          <StatNumber>${formatNumber(internalExpenses)}</StatNumber>
        </Stat>

        <Stat display="flex" justifyContent="center">
          <StatLabel>Total Expenses</StatLabel>
          <StatNumber>${formatNumber(totalExpenses)}</StatNumber>
        </Stat>

        <Stat display="flex" justifyContent="center">
          <StatLabel>Net Income</StatLabel>
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
