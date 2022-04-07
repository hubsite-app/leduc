import { Box, Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { DefaultRateSnippetFragment } from "../../generated/graphql";
import formatDate from "../../utils/formatDate";
import formatNumber from "../../utils/formatNumber";

interface IDefaultRatesTable {
  defaultRates: DefaultRateSnippetFragment[];
}

const DefaultRatesTable = ({ defaultRates }: IDefaultRatesTable) => {
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
                {rate.rates.map((rate, index) => (
                  <Box key={index}>
                    {formatDate(rate.date)} - ${formatNumber(rate.rate)}
                  </Box>
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
