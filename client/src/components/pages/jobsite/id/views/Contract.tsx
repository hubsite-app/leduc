import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { FiEdit, FiPlus, FiX } from "react-icons/fi";

import {
  JobsiteContractData,
  JobsiteFullSnippetFragment,
  useJobsiteUpdateContractMutation,
} from "../../../../../generated/graphql";
import formatNumber from "../../../../../utils/formatNumber";
import Card from "../../../../Common/Card";
import FormContainer from "../../../../Common/FormContainer";
import Permission from "../../../../Common/Permission";
import JobsiteContractForm from "../../../../Forms/Jobsite/Contract";

interface IJobsiteContract {
  jobsite: JobsiteFullSnippetFragment;
}

const JobsiteContract = ({ jobsite }: IJobsiteContract) => {
  /**
   * ----- Hook Initialization -----
   */

  const [showForm, setShowForm] = React.useState(false);

  const [update, { loading }] = useJobsiteUpdateContractMutation();

  const toast = useToast();

  /**
   * ----- Functions -----
   */

  const handleSubmit = React.useCallback(
    async (data: JobsiteContractData) => {
      try {
        const res = await update({
          variables: {
            id: jobsite._id,
            data,
          },
        });

        if (res.data?.jobsiteContract) {
          toast({
            status: "success",
            title: "Success",
            description: "Successfully updated contract",
            isClosable: true,
          });
          setShowForm(false);
        } else {
          toast({
            status: "error",
            title: "Error",
            description: "Something went wrong, please try again",
            isClosable: true,
          });
        }
      } catch (e: any) {
        toast({
          status: "error",
          title: "Error",
          description: e.message,
          isClosable: true,
        });
      }
    },
    [jobsite._id, toast, update]
  );

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (jobsite.contract) {
      return (
        <SimpleGrid spacing={2} columns={3}>
          <Stat display="flex" justifyContent="center">
            <StatLabel>Bid Value</StatLabel>
            <StatNumber>${formatNumber(jobsite.contract.bidValue)}</StatNumber>
          </Stat>
          <Stat display="flex" justifyContent="center">
            <StatLabel>Profit</StatLabel>
            <StatNumber>
              ${formatNumber(jobsite.contract.expectedProfit)}
            </StatNumber>
          </Stat>
          <Stat display="flex" justifyContent="center">
            <StatLabel>Work on Hand</StatLabel>
            <StatNumber>
              ${formatNumber(jobsite.contract.workOnHand)}
            </StatNumber>
          </Stat>
        </SimpleGrid>
      );
    } else {
      if (!showForm) {
        return (
          <Permission>
            <Button
              mx="auto"
              w="72"
              rightIcon={<FiPlus />}
              onClick={() => setShowForm(!showForm)}
            >
              Add Contract Details
            </Button>
          </Permission>
        );
      } else {
        return null;
      }
    }
  }, [jobsite.contract, showForm]);

  const rightButton = React.useMemo(() => {
    if (!jobsite.contract) return null;
    let icon = <FiEdit />;
    if (showForm) icon = <FiX />;

    return (
      <IconButton
        icon={icon}
        aria-label="add"
        backgroundColor="transparent"
        onClick={() => {
          setShowForm(!showForm);
        }}
      />
    );
  }, [jobsite.contract, showForm]);

  const progress = React.useMemo(() => {
    if (jobsite.contract) {
      const percentComplete =
        100 -
        (jobsite.contract.workOnHand /
          (jobsite.contract.bidValue - jobsite.contract.expectedProfit)) *
          100;

      let percent = percentComplete;

      let borderTopRightRadius = "";
      let backgroundColor = "blue.200";
      if (percentComplete > 100) {
        percent = 100;
        backgroundColor = "green.200";
      } else borderTopRightRadius = "0.25em";

      return (
        <Box
          w="inherit"
          position="relative"
          bottom={-2}
          marginX={-2}
          h={1}
          borderBottomRadius="0.25em"
        >
          <Tooltip label={`Progress: ${formatNumber(percentComplete)}%`}>
            <Box
              cursor="help"
              borderTopRightRadius={borderTopRightRadius}
              borderBottomRadius="0.25em"
              backgroundColor={backgroundColor}
              w={`${percent}%`}
              h="100%"
            />
          </Tooltip>
        </Box>
      );
    } else return null;
  }, [jobsite.contract]);

  return (
    <Card h="fit-content">
      <Flex flexDirection="row" justifyContent="space-between">
        <Heading my="auto" ml={2} size="md" w="100%">
          Contract
        </Heading>
        <Permission>{rightButton}</Permission>
      </Flex>
      {showForm ? (
        <FormContainer>
          <JobsiteContractForm
            submitHandler={handleSubmit}
            formOptions={{
              defaultValues: {
                bidValue: jobsite.contract?.bidValue,
                expectedProfit: jobsite.contract?.expectedProfit,
              },
            }}
            isLoading={loading}
          />
        </FormContainer>
      ) : null}
      {content}
      {progress}
    </Card>
  );
};

export default JobsiteContract;
