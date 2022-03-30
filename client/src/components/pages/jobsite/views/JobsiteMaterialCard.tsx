import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { JobsiteMaterialCardSnippetFragment } from "../../../../generated/graphql";
import formatNumber from "../../../../utils/formatNumber";
import JobsiteMaterialProgressBar from "../../../Common/JobsiteMaterial/ProgressBar";
import { FiEdit, FiX } from "react-icons/fi";
import JobsiteMaterialUpdate from "../../../Forms/JobsiteMaterial/JobsiteMaterialUpdate";

interface IJobsiteMaterialCard {
  jobsiteMaterial: JobsiteMaterialCardSnippetFragment;
}

const JobsiteMaterialCard = ({ jobsiteMaterial }: IJobsiteMaterialCard) => {
  /**
   * ----- Hook Initialization -----
   */

  const [edit, setEdit] = React.useState(false);

  return (
    <Box p={2} w="100%" border="1px solid lightgray">
      <Flex flexDir="row" justifyContent="space-between">
        <Stat>
          <StatLabel fontWeight="bold">
            {jobsiteMaterial.material.name} - {jobsiteMaterial.supplier.name}
          </StatLabel>
          <StatNumber>
            ${formatNumber(jobsiteMaterial.rate)} x{" "}
            {formatNumber(jobsiteMaterial.completedQuantity)} = $
            {formatNumber(
              jobsiteMaterial.rate * jobsiteMaterial.completedQuantity
            )}
          </StatNumber>
        </Stat>
        <IconButton
          backgroundColor="transparent"
          aria-label="edit"
          icon={edit ? <FiX /> : <FiEdit />}
          onClick={() => setEdit(!edit)}
        />
      </Flex>
      <Box>
        <JobsiteMaterialProgressBar jobsiteMaterial={jobsiteMaterial} />
      </Box>
      {edit && <JobsiteMaterialUpdate jobsiteMaterial={jobsiteMaterial} />}
    </Box>
  );
};

export default JobsiteMaterialCard;
