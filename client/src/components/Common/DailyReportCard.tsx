import { Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { DailyReportCardSnippetFragment } from "../../generated/graphql";
import createLink from "../../utils/createLink";
import Card from "./Card";
import TextLink from "./TextLink";

interface IDailyReportCard {
  dailyReport: DailyReportCardSnippetFragment;
}

const DailyReportCard = ({ dailyReport }: IDailyReportCard) => {
  return (
    <Card
      heading={
        <Flex flexDir="row">
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
        <TextLink link={createLink.crew(dailyReport.crew._id)}>
          {dailyReport.crew.name}
        </TextLink>
      </Text>
      <Text>
        <Text as="span" fontWeight="bold">
          Jobsite:{" "}
        </Text>
        <TextLink link={createLink.jobsite(dailyReport.jobsite._id)}>
          {dailyReport.jobsite.name}
        </TextLink>
      </Text>
    </Card>
  );
};

export default DailyReportCard;
