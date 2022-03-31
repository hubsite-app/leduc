import React from "react";
import { Flex } from "@chakra-ui/react";

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
      <Flex flexDir="column" mr={1}>
        {titles.map((title) => title)}
      </Flex>
      <Flex flexDir="column">{texts.map((text) => text)}</Flex>
    </Flex>
  );
};

export default TextGrid;
