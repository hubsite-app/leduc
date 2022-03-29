import { Box, Flex, Text } from "@chakra-ui/react";
import ProgressBar from "@ramonak/react-progress-bar";
import { JobsiteMaterialCardSnippetFragment } from "../../../generated/graphql";

interface IJobsiteMaterialProgressBar {
  jobsiteMaterial: JobsiteMaterialCardSnippetFragment;
}

const JobsiteMaterialProgressBar = ({
  jobsiteMaterial,
}: IJobsiteMaterialProgressBar) => {
  return (
    <Flex flexDir="row" justifyContent="space-around">
      <Box w="90%">
        <ProgressBar
          bgColor="#4285F4"
          completed={`${jobsiteMaterial.completedQuantity}`}
          maxCompleted={jobsiteMaterial.quantity}
        />
      </Box>
      <Text my="auto">
        {jobsiteMaterial.quantity} {jobsiteMaterial.unit}
      </Text>
    </Flex>
  );
};

export default JobsiteMaterialProgressBar;
