import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { TruckingRateSnippetFragment } from "../../../generated/graphql";
import formatNumber from "../../../utils/formatNumber";

interface ITruckingRatesTable {
  truckingRates: TruckingRateSnippetFragment[];
}

const TruckingRatesTable = ({ truckingRates }: ITruckingRatesTable) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Rate</Th>
          <Th>Type</Th>
        </Tr>
      </Thead>
      <Tbody>
        {truckingRates.map((rate, index) => (
          <Tr key={index}>
            <Td>{rate.title}</Td>
            <Td>${formatNumber(rate.rate)}</Td>
            <Td>{rate.type}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TruckingRatesTable;
