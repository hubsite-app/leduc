import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

import { DailyReportCardSnippetFragment } from "../../../generated/graphql";
import Card from "../Card";
import DailyReportCard from "./DailyReportCard";
import ShowMore from "../ShowMore";
import TextLink from "../TextLink";
import createLink from "../../../utils/createLink";

interface IDailyReportListCard {
  dailyReports: DailyReportCardSnippetFragment[];
  jobsiteId?: string;
  limit?: number;
}

const DailyReportListCard = ({
  limit,
  dailyReports,
  jobsiteId,
}: IDailyReportListCard) => {
  /**
   * ----- Rendering -----
   */

  return (
    <Card>
      <Flex flexDir="row" justifyContent="space-between">
        <Heading ml={2} my="auto" size="md">
          Daily Reports ({dailyReports.length})
        </Heading>
        {jobsiteId && (
          <TextLink link={createLink.jobsiteDailyReports(jobsiteId)}>
            View All
          </TextLink>
        )}
      </Flex>
      <ShowMore
        limit={limit}
        list={dailyReports.map((dailyReport) => (
          <DailyReportCard key={dailyReport._id} dailyReport={dailyReport} />
        ))}
      />
    </Card>
  );
};

export default DailyReportListCard;
