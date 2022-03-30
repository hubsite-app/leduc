import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { DefaultRateSnippetFragment } from "../../generated/graphql";
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
          <Th>Rate</Th>
        </Tr>
      </Thead>
      <Tbody>
        {defaultRates.map((rate, index) => (
          <Tr key={index}>
            <Td>{rate.title}</Td>
            <Td>${formatNumber(rate.rate)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DefaultRatesTable;
