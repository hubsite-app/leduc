import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { VehicleIssueCardSnippetFragment } from "../../../generated/graphql";
import Card from "../Card";
import VehicleIssuePriorityTag from "./PriorityTag";
import dayjs from "dayjs";
import UserIcon from "../User/Icon";
import TextLink from "../TextLink";
import createLink from "../../../utils/createLink";

interface IVehicleIssueCard {
  vehicleIssue: VehicleIssueCardSnippetFragment;
}

const VehicleIssueCard = ({ vehicleIssue }: IVehicleIssueCard) => {
  return (
    <Card
      heading={
        <Flex flexDir="row" justifyContent="space-between">
          <TextLink
            link={createLink.vehicleIssue(vehicleIssue._id)}
            color="black"
            fontWeight="bold"
            fontSize="lg"
          >
            {vehicleIssue.title}
          </TextLink>
          <VehicleIssuePriorityTag priority={vehicleIssue.priority} />
        </Flex>
      }
    >
      <Flex flexDir="row" justifyContent="space-between">
        <Box>
          <p>{vehicleIssue.description}</p>
          <TextLink link={createLink.vehicle(vehicleIssue.vehicle._id)}>
            {vehicleIssue.vehicle.name} ({vehicleIssue.vehicle.vehicleCode})
          </TextLink>
          <Text color="gray.500">
            created {dayjs(vehicleIssue.createdAt).format("MMM D, YYYY")} by{" "}
            {vehicleIssue.author.name}
          </Text>
        </Box>
        {vehicleIssue.assignedTo ? (
          <Flex flexDir="column" justifyContent="flex-end">
            <UserIcon name={vehicleIssue.assignedTo.name} />
          </Flex>
        ) : null}
      </Flex>
    </Card>
  );
};

export default VehicleIssueCard;
