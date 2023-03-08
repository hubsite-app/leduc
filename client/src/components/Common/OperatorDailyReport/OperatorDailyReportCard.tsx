import React from "react";
import { Box, Flex, HStack } from "@chakra-ui/react";
import { OperatorDailyReportCardSnippetFragment } from "../../../generated/graphql";
import operatorDailyReportName from "../../../utils/operatorDailyReportName";
import Card from "../Card";
import TextLink from "../TextLink";
import createLink from "../../../utils/createLink";
import operatorDailyReportTags from "../../../utils/operatorDailyReportTags";

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
      <div>{operatorDailyReportTags(operatorDailyReport)}</div>
    </Card>
  );
};

export default OperatorDailyReportCard;
