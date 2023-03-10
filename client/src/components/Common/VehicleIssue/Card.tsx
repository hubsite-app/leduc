import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { VehicleIssueCardSnippetFragment } from "../../../generated/graphql";
import Card from "../Card";
import VehicleIssuePriorityTag from "./PriorityTag";
import dayjs from "dayjs";
import UserIcon from "../User/Icon";

interface IVehicleIssueCard {
  vehicleIssue: VehicleIssueCardSnippetFragment;
}

const VehicleIssueCard = ({ vehicleIssue }: IVehicleIssueCard) => {
  return (
    <Card
      heading={
        <Flex flexDir="row" justifyContent="space-between">
          <Heading size="md">{vehicleIssue.title}</Heading>
          <VehicleIssuePriorityTag priority={vehicleIssue.priority} />
        </Flex>
      }
    >
      <Flex flexDir="row" justifyContent="space-between">
        <Box>
          <p>{vehicleIssue.description}</p>
          <Text color="gray.500">
            created {dayjs(vehicleIssue.createdAt).format("MMM D, YYYY")} by{" "}
            {vehicleIssue.author.name}
          </Text>
        </Box>
        {vehicleIssue.assignedTo ? (
          <UserIcon user={vehicleIssue.assignedTo} />
        ) : null}
      </Flex>
    </Card>
  );
};

export default VehicleIssueCard;
