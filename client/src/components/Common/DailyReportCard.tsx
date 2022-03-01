import dayjs from "dayjs";
import React from "react";
import { DailyReportCardSnippetFragment } from "../../generated/graphql";
import Card from "./Card";
import TextLink from "./TextLink";

interface IDailyReportCard {
  dailyReport: DailyReportCardSnippetFragment;
}

const DailyReportCard = ({ dailyReport }: IDailyReportCard) => {
  return (
    <Card
      heading={
        <TextLink
          link={`/daily-report/${dailyReport._id}`}
          color="black"
          fontWeight="bold"
          fontSize="lg"
        >
          {dailyReport.jobsite.name} -{" "}
          {dayjs(dailyReport.date).format("MMMM DD, YYYY")}
        </TextLink>
      }
    >
      {dailyReport.date}
    </Card>
  );
};

export default DailyReportCard;
