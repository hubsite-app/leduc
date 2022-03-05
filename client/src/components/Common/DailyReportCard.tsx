import { Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import {
  DailyReportCardSnippetFragment,
  useDailyReportApprovalUpdateMutation,
} from "../../generated/graphql";
import AdminOnly from "./AdminOnly";
import Card from "./Card";
import Checkbox from "./forms/Checkbox";
import TextLink from "./TextLink";

interface IDailyReportCard {
  dailyReport: DailyReportCardSnippetFragment;
}

const DailyReportCard = ({ dailyReport }: IDailyReportCard) => {
  const [updateApproval, { loading }] = useDailyReportApprovalUpdateMutation();

  return (
    <Card
      heading={
        <Flex flexDir="row">
          <AdminOnly>
            <Checkbox
              isChecked={dailyReport.approved}
              mr={2}
              isDisabled={loading}
              onChange={(e) =>
                updateApproval({
                  variables: {
                    id: dailyReport._id,
                    approved: e.target.checked,
                  },
                })
              }
            />
          </AdminOnly>
          <TextLink
            link={`/daily-report/${dailyReport._id}`}
            color="black"
            fontWeight="bold"
            fontSize="lg"
          >
            {dailyReport.jobsite.name} -{" "}
            {dayjs(dailyReport.date).format("MMMM DD, YYYY")}
          </TextLink>
        </Flex>
      }
    >
      <Text>
        <Text as="span" fontWeight="bold">
          Crew:{" "}
        </Text>
        <TextLink link={`/crew/${dailyReport.crew._id}`}>
          {dailyReport.crew.name}
        </TextLink>
      </Text>
    </Card>
  );
};

export default DailyReportCard;
