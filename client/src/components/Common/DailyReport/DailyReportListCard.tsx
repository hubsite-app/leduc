import { Heading } from "@chakra-ui/react";
import React from "react";

import { DailyReportCardSnippetFragment } from "../../../generated/graphql";
import Card from "../Card";
import DailyReportCard from "../DailyReportCard";
import ShowMore from "../ShowMore";

interface IDailyReportListCard {
  dailyReports: DailyReportCardSnippetFragment[];
  limit?: number;
}

const DailyReportListCard = ({ limit, dailyReports }: IDailyReportListCard) => {
  /**
   * ----- Rendering -----
   */

  return (
    <Card>
      <Heading ml={2} my="auto" size="md" w="100%">
        Daily Reports ({dailyReports.length})
      </Heading>
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
