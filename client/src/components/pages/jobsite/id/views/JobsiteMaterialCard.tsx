import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { JobsiteMaterialCardSnippetFragment } from "../../../../../generated/graphql";
import formatNumber from "../../../../../utils/formatNumber";
import JobsiteMaterialProgressBar from "../../../../Common/JobsiteMaterial/ProgressBar";
import { FiEdit, FiX } from "react-icons/fi";
import JobsiteMaterialUpdate from "../../../../Forms/JobsiteMaterial/JobsiteMaterialUpdate";
import Permission from "../../../../Common/Permission";
import FormContainer from "../../../../Common/FormContainer";

interface IJobsiteMaterialCard {
  jobsiteMaterial: JobsiteMaterialCardSnippetFragment;
  selected?: boolean;
}

const JobsiteMaterialCard = ({
  jobsiteMaterial,
  selected,
}: IJobsiteMaterialCard) => {
  /**
   * ----- Hook Initialization -----
   */

  const [edit, setEdit] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (ref.current && selected) {
      ref.current.focus();
    }
  }, [ref, selected]);

  /**
   * ----- Rendering -----
   */

  return (
    <Box
      p={2}
      w="100%"
      border="1px solid"
      borderColor="gray.300"
      ref={ref}
      tabIndex={0}
      _focusWithin={{ borderColor: "gray.600", backgroundColor: "gray.100" }}
    >
      <Flex flexDir="row" justifyContent="space-between">
        <Stat>
          <StatLabel fontWeight="bold">
            {jobsiteMaterial.material.name} - {jobsiteMaterial.supplier.name}
            {jobsiteMaterial.delivered && " (Delivered)"}
          </StatLabel>
          <StatNumber>
            {formatNumber(jobsiteMaterial.completedQuantity)}{" "}
            {jobsiteMaterial.unit}
          </StatNumber>
        </Stat>
        <Permission>
          <IconButton
            backgroundColor="transparent"
            aria-label="edit"
            icon={edit ? <FiX /> : <FiEdit />}
            onClick={() => setEdit(!edit)}
          />
        </Permission>
      </Flex>
      <Box>
        <JobsiteMaterialProgressBar jobsiteMaterial={jobsiteMaterial} />
      </Box>
      {edit && (
        <FormContainer>
          <JobsiteMaterialUpdate jobsiteMaterial={jobsiteMaterial} />
        </FormContainer>
      )}
    </Box>
  );
};

export default JobsiteMaterialCard;
