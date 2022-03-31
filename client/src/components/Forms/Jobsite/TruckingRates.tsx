import { Box, Button, Flex, IconButton, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { TruckingRateTypes } from "../../../constants/select";
import { TruckingRateSnippetFragment } from "../../../generated/graphql";
import Number from "../../Common/forms/Number";
import TextField from "../../Common/forms/TextField";
import TruckingRateType from "./TruckingRateType";

interface ITruckingRates {
  truckingRates: TruckingRateSnippetFragment[];
  onChange?: (
    truckingRates: Omit<TruckingRateSnippetFragment, "__typename">[]
  ) => void;
  isLoading?: boolean;
  allowDeletion?: boolean;
}

const TruckingRates = ({
  truckingRates,
  onChange,
  isLoading,
  allowDeletion = false,
}: ITruckingRates) => {
  /**
   * ----- Variables -----
   */

  const truckingRatesCopy: Omit<TruckingRateSnippetFragment, "__typename">[] =
    React.useMemo(() => {
      const copy: TruckingRateSnippetFragment[] = JSON.parse(
        JSON.stringify(truckingRates)
      );

      for (let i = 0; i < copy.length; i++) {
        if (copy[i].__typename) delete copy[i].__typename;
      }

      return copy;
    }, [truckingRates]);

  /**
   * ----- Functions -----
   */

  const addRate = React.useCallback(() => {
    truckingRatesCopy.push({
      title: "",
      rate: 0,
      type: TruckingRateTypes[0],
    });

    if (onChange) onChange(truckingRatesCopy);
  }, [truckingRatesCopy, onChange]);

  const removeRate = React.useCallback(
    (index: number) => {
      truckingRatesCopy.splice(index, 1);
      if (onChange) onChange(truckingRatesCopy);
    },
    [truckingRatesCopy, onChange]
  );

  const setTitle = React.useCallback(
    (value: string, index: number) => {
      truckingRatesCopy[index].title = value;

      if (onChange) onChange(truckingRatesCopy);
    },
    [truckingRatesCopy, onChange]
  );

  const setRate = React.useCallback(
    (value: number, index: number) => {
      truckingRatesCopy[index].rate = value;

      if (onChange) onChange(truckingRatesCopy);
    },
    [truckingRatesCopy, onChange]
  );

  const setType = React.useCallback(
    (value: string, index: number) => {
      truckingRatesCopy[index].type = value;

      if (onChange) onChange(truckingRatesCopy);
    },
    [truckingRatesCopy, onChange]
  );

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (onChange) onChange(truckingRatesCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * ----- Rendering -----
   */

  return (
    <Box>
      {truckingRates.map((rate, index) => (
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
            columns={[1, 1, 3]}
            spacing={2}
            w={allowDeletion ? "95%" : "100%"}
          >
            <TextField
              value={rate.title}
              label="Title"
              isDisabled={isLoading}
              onChange={(e) => setTitle(e.target.value, index)}
            />
            <Number
              value={rate.rate}
              label="Rate"
              isDisabled={isLoading}
              format={(val) => `$${val}`}
              parse={(val) => val.replace(/[$]/, "")}
              onChange={(_, number) => setRate(number, index)}
            />
            <TruckingRateType
              value={rate.type}
              label="Type"
              isDisabled={isLoading}
              onChange={(e) => setType(e.target.value, index)}
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

export default TruckingRates;
