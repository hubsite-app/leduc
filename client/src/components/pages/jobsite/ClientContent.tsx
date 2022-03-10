import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useJobsiteFullQuery } from "../../../generated/graphql";
import Card from "../../Common/Card";
import DailyReportCard from "../../Common/DailyReportCard";
import Loading from "../../Common/Loading";

interface IJobsiteClientContent {
  id: string;
}

const JobsiteClientContent = ({ id }: IJobsiteClientContent) => {
  /**
   * ----- Hook Initialization -----
   */

  const { data } = useJobsiteFullQuery({
    variables: { id },
  });

  /**
   * ----- Rendering -----
   */

  return React.useMemo(() => {
    if (data?.jobsite) {
      const { jobsite } = data;

      return (
        <Box>
          <Card>
            <Text>
              <Text fontWeight="bold" as="span">
                Code:{" "}
              </Text>
              {jobsite.jobcode}
            </Text>
            {jobsite.description && (
              <Text>
                <Text fontWeight="bold" as="span">
                  Description:{" "}
                </Text>
                {jobsite.description}
              </Text>
            )}
          </Card>
          {jobsite.dailyReports.length > 0 && (
            <Card>
              <Heading size="md">Daily Reports</Heading>
              {jobsite.dailyReports.map((dailyReport) => (
                <DailyReportCard
                  dailyReport={dailyReport}
                  key={dailyReport._id}
                />
              ))}
            </Card>
          )}
        </Box>
      );
    } else return <Loading />;
  }, [data]);
};

export default JobsiteClientContent;
