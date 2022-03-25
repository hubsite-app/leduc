import { Heading } from "@chakra-ui/react";
import React from "react";

import { DailyReportCardSnippetFragment } from "../../../generated/graphql";
import Card from "../Card";
import DailyReportCard from "../DailyReportCard";

interface IDailyReportListCard {
  dailyReports: DailyReportCardSnippetFragment[];
}

const DailyReportListCard = ({ dailyReports }: IDailyReportListCard) => {
  /**
   * ----- Hook Initialization -----
   */

  const [collapsed, setCollapsed] = React.useState(true);

  /**
   * ----- Rendering -----
   */

  return (
    <Card>
      <Heading
        ml={2}
        my="auto"
        size="md"
        w="100%"
        cursor="pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        Daily Reports ({dailyReports.length})
      </Heading>
      {!collapsed &&
        dailyReports.map((dailyReport) => (
          <DailyReportCard key={dailyReport._id} dailyReport={dailyReport} />
        ))}
    </Card>
  );
};

export default DailyReportListCard;
