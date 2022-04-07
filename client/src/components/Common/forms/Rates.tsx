import { Box, Button, Flex, IconButton, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { RateSnippetFragment } from "../../../generated/graphql";
import Number from "./Number";
import TextField from "./TextField";

interface RateError {
  date?: {
    message?: string;
  };
  rate?: {
    message?: string;
  };
}

export interface IRates {
  rates: RateSnippetFragment[];
  onChange?: (rates: Omit<RateSnippetFragment, "__typename">[]) => void;
  isLoading?: boolean;
  errors?: RateError[];
}

const Rates = ({ rates = [], onChange, isLoading, errors }: IRates) => {
  /**
   * ----- Variables -----
   */

  const ratesCopy: RateSnippetFragment[] = React.useMemo(() => {
    const copy: RateSnippetFragment[] = JSON.parse(JSON.stringify(rates));

    for (let i = 0; i < copy.length; i++) {
      if (copy[i].__typename) delete copy[i].__typename;
    }

    return copy;
  }, [rates]);

  /**
   * ----- Functions -----
   */

  const addRate = React.useCallback(() => {
    ratesCopy.push({
      rate: 0,
      date: new Date(),
    });
    if (onChange) onChange(ratesCopy);
  }, [onChange, ratesCopy]);

  const removeRate = React.useCallback(
    (index: number) => {
      ratesCopy.splice(index, 1);
      if (onChange) onChange(ratesCopy);
    },
    [onChange, ratesCopy]
  );

  const setDate = React.useCallback(
    (value: string, index: number) => {
      ratesCopy[index].date = value;

      if (onChange) onChange(ratesCopy.slice().sort((a, b) => b.date - a.date));
    },
    [ratesCopy, onChange]
  );

  const setRate = React.useCallback(
    (value: number, index: number) => {
      ratesCopy[index].rate = value;

      if (onChange) onChange(ratesCopy);
    },
    [ratesCopy, onChange]
  );

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (onChange) onChange(ratesCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * ----- Rendering -----
   */

  return (
    <Box>
      {rates.map((rate, index) => (
        <Flex
          key={index}
          justifyContent="space-between"
          flexDir="row"
          backgroundColor="gray.200"
          borderRadius={4}
          p={2}
          m={2}
        >
          <SimpleGrid columns={[1, 1, 2]} spacing={2} w="95%">
            <TextField
              value={rate.date}
              isDisabled={isLoading}
              type="date"
              label="Date"
              onChange={(e) => setDate(e.target.value, index)}
              errorMessage={errors && errors[index]?.date?.message}
            />
            <Number
              value={rate.rate}
              isDisabled={isLoading}
              label="Rate"
              format={(val) => `$${val}`}
              parse={(val) => val.replace(/[$]/, "")}
              onChange={(_, number) => setRate(number, index)}
              errorMessage={errors && errors[index]?.rate?.message}
            />
          </SimpleGrid>
          <IconButton
            m="auto"
            aria-label="remove"
            icon={<FiTrash />}
            backgroundColor="transparent"
            onClick={() => removeRate(index)}
          />
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

export default Rates;
