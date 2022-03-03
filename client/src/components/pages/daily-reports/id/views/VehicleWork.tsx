import { Flex, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { FiPlus } from "react-icons/fi";

import { DailyReportFullSnippetFragment } from "../../../../../generated/graphql";
import Card from "../../../../Common/Card";
import VehicleWorkCard from "./VehicleWorldCard";

interface IVehicleWork {
  dailyReport: DailyReportFullSnippetFragment;
}

const VehicleWork = ({ dailyReport }: IVehicleWork) => {
  console.log(dailyReport.vehicleWork);

  return (
    <Card>
      <Flex flexDir="row" justifyContent="space-between">
        <Heading my="auto" ml={2} size="md">
          Vehicle Hours
        </Heading>
        <IconButton
          icon={<FiPlus />}
          aria-label="add"
          backgroundColor="transparent"
        />
      </Flex>
      <Flex flexDir="column" w="100%" px={4} py={2}>
        {dailyReport.vehicleWork.map((work) => (
          <VehicleWorkCard vehicleWork={work} key={work._id} />
        ))}
      </Flex>
    </Card>
  );
};

export default VehicleWork;
