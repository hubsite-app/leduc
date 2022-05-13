import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import {
  ReportIssueSnippetFragment,
  ReportIssueTypes,
} from "../../../generated/graphql";
import createLink from "../../../utils/createLink";

interface IJobsiteReportIssueCard {
  issue: ReportIssueSnippetFragment;
}

const JobsiteReportIssueCard = ({ issue }: IJobsiteReportIssueCard) => {
  /**
   * ----- Variables -----
   */

  const text = React.useMemo(() => {
    switch (issue.type) {
      case ReportIssueTypes.EmployeeRateZero: {
        if (issue.employee)
          return (
            <Link href={createLink.employee(issue.employee._id)} passHref>
              <Text>
                <Text as="span" fontWeight="bold">
                  {issue.employee.name}
                </Text>{" "}
                does not have a set rate
              </Text>
            </Link>
          );
        else return null;
      }
      case ReportIssueTypes.VehicleRateZero: {
        if (issue.vehicle)
          return (
            <Link href={createLink.vehicle(issue.vehicle?._id)} passHref>
              <Text>
                <Text as="span" fontWeight="bold">
                  {issue.vehicle.name} - {issue.vehicle.vehicleCode}
                </Text>{" "}
                does not have a set rate
              </Text>
            </Link>
          );
        else return null;
      }
      default: {
        return null;
      }
    }
  }, [issue]);

  /**
   * ----- Rendering -----
   */

  return (
    <Flex
      w="100%"
      _hover={{ backgroundColor: "gray.100" }}
      py={2}
      pr={2}
      cursor="pointer"
      flexDir="row"
    >
      <Box backgroundColor="gray.400" minW="1%" mr={2}></Box>
      {text}
    </Flex>
  );
};

export default JobsiteReportIssueCard;
