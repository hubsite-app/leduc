import React from "react";

import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { DailyReportFullSnippetFragment } from "../../../../../generated/graphql";
import Card from "../../../../Common/Card";
import { FiPlus, FiX } from "react-icons/fi";
import ProductionCard from "./ProductionCard";
import ProductionCreateForm from "./ProductionCreateForm";

interface IProduction {
  dailyReport: DailyReportFullSnippetFragment;
}

const Production = ({ dailyReport }: IProduction) => {
  /**
   * ----- Hook Initialization -----
   */

  const [addForm, setAddForm] = React.useState(false);

  const [collapsed, setCollapsed] = React.useState(true);

  /**
   * ----- Rendering -----
   */

  return (
    <Card h="fit-content">
      <Flex flexDir="row" justifyContent="space-between">
        <Heading
          my="auto"
          ml={2}
          size="md"
          w="100%"
          cursor="pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          Production ({dailyReport.productions.length || 0})
        </Heading>
        <IconButton
          icon={addForm ? <FiX /> : <FiPlus />}
          aria-label="add"
          backgroundColor="transparent"
          onClick={() => setAddForm(!addForm)}
        />
      </Flex>
      {addForm && (
        <ProductionCreateForm
          dailyReport={dailyReport}
          closeForm={() => setAddForm(false)}
        />
      )}
      {!collapsed && (
        <Flex flexDir="column" w="100%" px={4} py={2}>
          {dailyReport.productions.map((production) => (
            <ProductionCard
              production={production}
              dailyReportDate={dailyReport.date}
              key={production._id}
            />
          ))}
        </Flex>
      )}
    </Card>
  );
};

export default Production;
