import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { OperatorDailyReportCardSnippetFragment } from "../../../generated/graphql";
import operatorDailyReportName from "../../../utils/operatorDailyReportName";
import Card from "../Card";
import TextLink from "../TextLink";
import createLink from "../../../utils/createLink";
import operatorDailyReportTags from "../../../utils/operatorDailyReportTags";
import dayjs from "dayjs";

interface IOperatorDailyReportCard {
  operatorDailyReport: OperatorDailyReportCardSnippetFragment;
}

const OperatorDailyReportCard = ({
  operatorDailyReport,
}: IOperatorDailyReportCard) => {
  return (
    <Card
      heading={
        <Box>
          <TextLink
            link={createLink.operatorDailyReport(operatorDailyReport._id)}
            color="black"
            fontWeight="bold"
            fontSize="lg"
          >
            {operatorDailyReportName(operatorDailyReport)}
          </TextLink>
        </Box>
      }
    >
      <Box>
        {operatorDailyReportTags(operatorDailyReport).length > 0 ? (
          operatorDailyReportTags(operatorDailyReport)
        ) : (
          <b>No issues detected</b>
        )}
      </Box>
      <Text color="gray.500">
        created {dayjs(operatorDailyReport.createdAt).format("MMM D, YYYY")} by{" "}
        {operatorDailyReport.author.name}
      </Text>
    </Card>
  );
};

export default OperatorDailyReportCard;
