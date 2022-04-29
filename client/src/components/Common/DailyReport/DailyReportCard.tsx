import { Box, Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { FiBook, FiDollarSign } from "react-icons/fi";
import { DailyReportCardSnippetFragment } from "../../../generated/graphql";
import createLink from "../../../utils/createLink";
import Card from "../Card";
import TextGrid from "../TextGrid";
import TextLink from "../TextLink";

interface IDailyReportCard {
  dailyReport: DailyReportCardSnippetFragment;
}

const DailyReportCard = ({ dailyReport }: IDailyReportCard) => {
  console.log(dailyReport.jobCostApproved, dailyReport.payrollComplete);

  return (
    <Card
      heading={
        <Flex flexDir="row" justifyContent="space-between">
          <Box>
            <TextLink
              link={createLink.dailyReport(dailyReport._id)}
              color="black"
              fontWeight="bold"
              fontSize="lg"
            >
              {dailyReport.jobsite.name} -{" "}
              {dayjs(dailyReport.date).format("MMMM DD, YYYY")}
            </TextLink>
          </Box>
          <Flex flexDir="row">
            {dailyReport.jobCostApproved && (
              <Tooltip label="Job costing approved">
                <span>
                  <Icon cursor="help" as={FiBook} />
                </span>
              </Tooltip>
            )}
            {dailyReport.payrollComplete && (
              <Tooltip label="Payroll complete">
                <span>
                  <Icon cursor="help" as={FiDollarSign} />
                </span>
              </Tooltip>
            )}
          </Flex>
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
