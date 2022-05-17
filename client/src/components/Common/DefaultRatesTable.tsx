import {
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { FiGitMerge } from "react-icons/fi";
import { DefaultRateSnippetFragment } from "../../generated/graphql";
import formatDate from "../../utils/formatDate";
import formatNumber from "../../utils/formatNumber";

interface IDefaultRatesTable {
  defaultRates: DefaultRateSnippetFragment[];
  ratePropagateButton?: boolean;
  onPropagate?: (itemIndex: number, rateIndex: number) => void;
  isLoading?: boolean;
}

const DefaultRatesTable = ({
  defaultRates,
  ratePropagateButton = false,
  onPropagate,
  isLoading,
}: IDefaultRatesTable) => {
  /**
   * ----- Rendering -----
   */

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Rates</Th>
        </Tr>
      </Thead>
      <Tbody>
        {defaultRates.map((rate, index) => (
          <Tr key={index}>
            <Td>{rate.title}</Td>
            <Td>
              <Flex flexDir="column">
                {rate.rates.map((r, rateIndex) => (
                  <Flex key={rateIndex} flexDir="row">
                    <Text my="auto">
                      {formatDate(r.date)} - ${formatNumber(r.rate)}
                    </Text>
                    {ratePropagateButton &&
                      onPropagate &&
                      rateIndex === rate.rates.length - 1 && (
                        <Tooltip label="Propagates this rate to all applicable Jobsites.">
                          <IconButton
                            isLoading={isLoading}
                            my="auto"
                            mx={1}
                            size="sm"
                            backgroundColor="transparent"
                            icon={<FiGitMerge />}
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure? This will add this to the Trucking Rates of all Jobsites where possible. This cannot be reversed."
                                )
                              ) {
                                onPropagate(index, rateIndex);
                              }
                            }}
                            aria-label="propagate"
                          />
                        </Tooltip>
                      )}
                  </Flex>
                ))}
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DefaultRatesTable;
