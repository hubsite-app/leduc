import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface IProgressBar {
  percentComplete: number;
  totalLabel?: string;
  completedLabel?: string;
}

const ProgressBar = ({
  percentComplete,
  totalLabel,
  completedLabel,
}: IProgressBar) => {
  const width = React.useMemo(() => {
    if (percentComplete > 100) return 100;
    else if (percentComplete < 0) return 0;
    else return percentComplete;
  }, [percentComplete]);

  const backgroundColor = React.useMemo(() => {
    if (percentComplete > 100) return "red.300";
    if (percentComplete > 90 && width <= 100) return "green.300";
    return "blue.300";
  }, [percentComplete, width]);

  /**
   * ----- Render -----
   */

  return (
    <Box m={1}>
      <Box borderRadius={12} backgroundColor="gray.200" w="100%" h={7}>
        <Box
          borderRadius={12}
          w={`${width}%`}
          h={7}
          backgroundColor={backgroundColor}
        >
          <Text
            fontWeight="semibold"
            mx={3}
            pt={1}
            overflowWrap="normal"
            whiteSpace="nowrap"
          >
            {completedLabel}
          </Text>
        </Box>
      </Box>
      <Flex justifyContent="end">
        <Text pr={2} fontWeight="bold">
          {totalLabel}
        </Text>
      </Flex>
    </Box>
  );
};

export default ProgressBar;
