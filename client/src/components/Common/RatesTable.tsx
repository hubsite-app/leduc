import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import dayjs from "dayjs";
import { RateSnippetFragment } from "../../generated/graphql";
import formatNumber from "../../utils/formatNumber";

interface IRatesTable {
  rates: RateSnippetFragment[];
}

const RatesTable = ({ rates }: IRatesTable) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Rate</Th>
        </Tr>
      </Thead>
      <Tbody>
        {rates.map((rate, index) => (
          <Tr key={index}>
            <Td>{dayjs(rate.date).format("MMMM D, YYYY")}</Td>
            <Td>${formatNumber(rate.rate)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default RatesTable;
