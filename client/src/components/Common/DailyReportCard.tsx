import { Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { DailyReportCardSnippetFragment } from "../../generated/graphql";
import createLink from "../../utils/createLink";
import Card from "./Card";
import TextGrid from "./TextGrid";
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
      <TextGrid
        rows={[
          {
            title: (
              <Text as="span" fontWeight="bold">
                Crew:{" "}
              </Text>
            ),
            text: (
              <TextLink link={createLink.crew(dailyReport.crew._id)}>
                {dailyReport.crew.name}
              </TextLink>
            ),
          },
          {
            title: (
              <Text as="span" fontWeight="bold">
                Jobsite:{" "}
              </Text>
            ),
            text: (
              <TextLink link={createLink.jobsite(dailyReport.jobsite._id)}>
                {dailyReport.jobsite.name}
              </TextLink>
            ),
          },
        ]}
      />
      <Text></Text>
    </Card>
  );
};

export default DailyReportCard;
