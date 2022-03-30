import { Box, Flex, Text } from "@chakra-ui/react";
import ProgressBar from "@ramonak/react-progress-bar";
import { JobsiteMaterialCardSnippetFragment } from "../../../generated/graphql";

interface IJobsiteMaterialProgressBar {
  jobsiteMaterial: JobsiteMaterialCardSnippetFragment;
}

const JobsiteMaterialProgressBar = ({
  jobsiteMaterial,
}: IJobsiteMaterialProgressBar) => {
  let color = "#4285F4";
  if (jobsiteMaterial.completedQuantity > jobsiteMaterial.quantity)
    color = "red";

  return (
    <Flex flexDir="row" justifyContent="space-around">
      <Box w="90%">
        <ProgressBar
          bgColor={color}
          completed={`${jobsiteMaterial.completedQuantity}`}
          maxCompleted={jobsiteMaterial.quantity}
        />
      </Box>
      <Text my="auto" fontWeight="bold">
        {jobsiteMaterial.quantity} {jobsiteMaterial.unit}
      </Text>
    </Flex>
  );
};

export default JobsiteMaterialProgressBar;
