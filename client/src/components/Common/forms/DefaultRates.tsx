import { Box, Button, Flex, IconButton, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { DefaultRateSnippetFragment } from "../../../generated/graphql";
import Number from "./Number";
import TextField from "./TextField";

interface IDefaultRates {
  defaultRates: DefaultRateSnippetFragment[];
  onChange?: (
    defaultRates: Omit<DefaultRateSnippetFragment, "__typename">[]
  ) => void;
  isLoading?: boolean;
  allowDeletion?: boolean;
}

const DefaultRates = ({
  defaultRates,
  onChange,
  isLoading,
  allowDeletion = false,
}: IDefaultRates) => {
  /**
   * ----- Variables -----
   */

  const defaultRatesCopy: Omit<DefaultRateSnippetFragment, "__typename">[] =
    React.useMemo(() => {
      const copy: DefaultRateSnippetFragment[] = JSON.parse(
        JSON.stringify(defaultRates)
      );

      for (let i = 0; i < copy.length; i++) {
        if (copy[i].__typename) delete copy[i].__typename;
      }

      return copy;
    }, [defaultRates]);

  /**
   * ----- Functions -----
   */

  const addRate = React.useCallback(() => {
    defaultRatesCopy.push({
      title: "",
      rate: 0,
    });

    if (onChange) onChange(defaultRatesCopy);
  }, [defaultRatesCopy, onChange]);

  const removeRate = React.useCallback(
    (index: number) => {
      defaultRatesCopy.splice(index, 1);
      if (onChange) onChange(defaultRatesCopy);
    },
    [defaultRatesCopy, onChange]
  );

  const setTitle = React.useCallback(
    (value: string, index: number) => {
      defaultRatesCopy[index].title = value;

      if (onChange) onChange(defaultRatesCopy);
    },
    [defaultRatesCopy, onChange]
  );

  const setRate = React.useCallback(
    (value: number, index: number) => {
      defaultRatesCopy[index].rate = value;

      if (onChange) onChange(defaultRatesCopy);
    },
    [defaultRatesCopy, onChange]
  );

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (onChange) onChange(defaultRatesCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * ----- Rendering -----
   */

  return (
    <Box>
      {defaultRates.map((def, index) => (
        <Flex
          key={index}
          justifyContent="space-between"
          flexDir="row"
          backgroundColor="gray.200"
          borderRadius={4}
          p={2}
          m={2}
        >
          <SimpleGrid
            columns={[1, 1, 2]}
            spacing={2}
            w={allowDeletion ? "95%" : "100%"}
          >
            <TextField
              value={def.title}
              label="Title"
              isDisabled={isLoading}
              onChange={(e) => setTitle(e.target.value, index)}
            />
            <Number
              value={def.rate}
              label="Rate"
              isDisabled={isLoading}
              format={(val) => `$${val}`}
              parse={(val) => val.replace(/[$]/, "")}
              onChange={(_, number) => setRate(number, index)}
            />
          </SimpleGrid>
          {allowDeletion && (
            <IconButton
              m="auto"
              aria-label="remove"
              icon={<FiTrash />}
              backgroundColor="transparent"
              onClick={() => removeRate(index)}
            />
          )}
        </Flex>
      ))}
      <Flex justifyContent="end">
        <Button
          mt={2}
          isLoading={isLoading}
          leftIcon={<FiPlus />}
          onClick={addRate}
        >
          New
        </Button>
      </Flex>
    </Box>
  );
};

export default DefaultRates;
