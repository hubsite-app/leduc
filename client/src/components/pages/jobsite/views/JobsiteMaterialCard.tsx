import { Box, Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { JobsiteMaterialCardSnippetFragment } from "../../../../generated/graphql";
import JobsiteMaterialProgressBar from "../../../Common/JobsiteMaterial/ProgressBar";

interface IJobsiteMaterialCard {
  jobsiteMaterial: JobsiteMaterialCardSnippetFragment;
}

const JobsiteMaterialCard = ({ jobsiteMaterial }: IJobsiteMaterialCard) => {
  return (
    <Box p={2} w="100%" border="1px solid lightgray">
      <Flex flexDir="row" justifyContent="space-between">
        <Stat>
          <StatLabel fontWeight="bold">
            {jobsiteMaterial.material.name} - {jobsiteMaterial.supplier.name}
          </StatLabel>
          <StatNumber>${jobsiteMaterial.rate}</StatNumber>
        </Stat>
      </Flex>
      <Box>
        <JobsiteMaterialProgressBar jobsiteMaterial={jobsiteMaterial} />
      </Box>
    </Box>
  );
};

export default JobsiteMaterialCard;
