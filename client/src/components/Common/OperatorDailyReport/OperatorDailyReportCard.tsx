import React from "react";
import { Box } from "@chakra-ui/react";
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
      <div>
        {operatorDailyReportTags(operatorDailyReport).length > 0
          ? operatorDailyReportTags(operatorDailyReport)
          : "No issues detected"}
      </div>
    </Card>
  );
};

export default OperatorDailyReportCard;
