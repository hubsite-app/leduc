import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { FiPlus, FiX } from "react-icons/fi";

import { JobsiteFullSnippetFragment } from "../../../../../generated/graphql";
import Card from "../../../../Common/Card";
import ShowMore from "../../../../Common/ShowMore";
import Warning from "../../../../Common/Warning";
import JobsiteMaterialCreate from "../../../../Forms/JobsiteMaterial/JobsiteMaterialCreate";
import MaterialShipmentCard from "../../../../Common/MaterialShipment/MaterialShipmentCard";
import JobsiteMaterialCard from "./JobsiteMaterialCard";
import Permission from "../../../../Common/Permission";
import FormContainer from "../../../../Common/FormContainer";

interface IJobsiteMaterialsCosting {
  jobsite: JobsiteFullSnippetFragment;
  selectedJobsiteMaterial?: string;
}

const JobsiteMaterialsCosting = ({
  jobsite,
  selectedJobsiteMaterial,
}: IJobsiteMaterialsCosting) => {
  /**
   * ----- Hook Initialization -----
   */

  const [addForm, setAddForm] = React.useState(false);

  const [nonCostedList, setNonCostedList] = React.useState(false);

  /**
   * ----- Variables -----
   */

  const materialsList = React.useMemo(() => {
    return [
      ...jobsite.materials.filter(
        (material) => material._id === selectedJobsiteMaterial
      ),
      ...jobsite.materials.filter(
        (material) => material._id !== selectedJobsiteMaterial
      ),
    ];
  }, [jobsite.materials, selectedJobsiteMaterial]);

  /**
   * ----- Rendering -----
   */

  return (
    <Card h="fit-content">
      <Flex flexDir="row" justifyContent="space-between">
        <Heading my="auto" ml={2} size="md" w="100%">
          Materials ({jobsite.materials.length})
        </Heading>
        <HStack spacing={2}>
          {jobsite.nonCostedMaterialShipments.length > 0 && (
            <Warning
              description={`${jobsite.nonCostedMaterialShipments.length} non-costed`}
              onClick={() => setNonCostedList(!nonCostedList)}
            />
          )}
          <Permission>
            <IconButton
              icon={addForm ? <FiX /> : <FiPlus />}
              aria-label="add"
              backgroundColor="transparent"
              onClick={() => setAddForm(!addForm)}
            />
          </Permission>
        </HStack>
      </Flex>
      {addForm && (
        <FormContainer>
          <JobsiteMaterialCreate
            onSuccess={() => setAddForm(false)}
            jobsiteId={jobsite._id}
          />
        </FormContainer>
      )}
      {nonCostedList && (
        <Box p={4} borderRadius={6} backgroundColor="red.100">
          {jobsite.nonCostedMaterialShipments.map((materialShipment) => (
            <MaterialShipmentCard
              backgroundColor="white"
              key={materialShipment._id}
              materialShipment={materialShipment}
              dailyReport={materialShipment.dailyReport}
            />
          ))}
        </Box>
      )}
      <Flex w="100%" flexDir="column" px={4} py={2}>
        {materialsList.length > 0 ? (
          <ShowMore
            list={materialsList.map((jobsiteMaterial) => (
              <JobsiteMaterialCard
                jobsiteMaterial={jobsiteMaterial}
                key={jobsiteMaterial._id}
                selected={jobsiteMaterial._id === selectedJobsiteMaterial}
              />
            ))}
          />
        ) : (
          <Center>No Materials</Center>
        )}
      </Flex>
    </Card>
  );
};

export default JobsiteMaterialsCosting;
