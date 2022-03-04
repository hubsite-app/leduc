import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { FiEdit, FiTrash, FiX } from "react-icons/fi";

import { ProductionCardSnippetFragment } from "../../../../../generated/graphql";
import hourString from "../../../../../utils/hourString";

interface IProductionCard {
  production: ProductionCardSnippetFragment;
  dailyReportDate: Date;
}

const ProductionCard = ({ production }: IProductionCard) => {
  /**
   * ----- Hook Initialization -----
   */

  const [edit, setEdit] = React.useState(false);

  /**
   * ----- Variables -----
   */

  const hours = React.useMemo(() => {
    return Math.abs(
      dayjs(production.endTime).diff(production.startTime, "hours")
    );
  }, [production.endTime, production.startTime]);

  /**
   * ----- Rendering -----
   */

  return (
    <Box p={2} w="100%" border="1px solid lightgray">
      <Flex flexDir="row" justifyContent="space-between">
        <Box>
          <Text>
            <Text as="span" fontWeight="bold">
              {production.jobTitle}
            </Text>
            {" - "}
            {production.quantity} {production.unit}
          </Text>
          <Text>
            {dayjs(production.startTime).format("h:mm a")} -{" "}
            {dayjs(production.endTime).format("h:mm a")} ({hours}{" "}
            {hourString(hours)})
          </Text>
        </Box>
        <Flex flexDir="row">
          {edit && (
            <IconButton
              backgroundColor="transparent"
              icon={<FiTrash />}
              aria-label="delete"
              // onClick={() => window.confirm("Are you sure?") && remove()}
            />
          )}
          <IconButton
            backgroundColor="transparent"
            icon={edit ? <FiX /> : <FiEdit />}
            aria-label="edit"
            onClick={() => setEdit(!edit)}
          />
        </Flex>
      </Flex>
      {edit && (
        <Box backgroundColor="gray.200" p={2} borderRadius={4}>
          <form></form>
        </Box>
      )}
    </Box>
  );
};

export default ProductionCard;
