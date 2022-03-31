import React from "react";
import { Box, Flex } from "@chakra-ui/react";

interface ITextGrid {
  rows: {
    title: React.ReactNode;
    text: React.ReactNode;
  }[];
}

const TextGrid = ({ rows }: ITextGrid) => {
  const titles = React.useMemo(() => {
    return rows.map((row) => row.title);
  }, [rows]);
  const texts = React.useMemo(() => {
    return rows.map((row) => row.text);
  }, [rows]);

  return (
    <Flex flexDir="row">
      <Flex flexDir="column" mr={2}>
        {titles.map((title, index) => (
          <Box my="2px" key={index}>
            {title}
          </Box>
        ))}
      </Flex>
      <Flex flexDir="column">
        {texts.map((text, index) => (
          <Box my="2px" key={index}>
            {text}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default TextGrid;
