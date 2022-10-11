import { SubmitHandler, UseFormProps } from "react-hook-form";
import { SimpleGrid } from "@chakra-ui/react";
import { useJobsiteContractForm } from "../../../forms/jobsite";
import { JobsiteContractData } from "../../../generated/graphql";
import SubmitButton from "../../Common/forms/SubmitButton";

interface IJobsiteContractForm {
  submitHandler: SubmitHandler<JobsiteContractData>;

  formOptions?: UseFormProps;
  isLoading?: boolean;
}

const JobsiteContractForm = ({
  submitHandler,
  isLoading,
  formOptions,
}: IJobsiteContractForm) => {
  /**
   * ----- Hook Initialization -----
   */

  const { FormComponents } = useJobsiteContractForm(formOptions);

  /**
   * ----- Rendering -----
   */

  return (
    <FormComponents.Form submitHandler={submitHandler}>
      <SimpleGrid spacing={2} columns={2}>
        <FormComponents.BidValue isLoading={isLoading} />
        <FormComponents.ExpectedProfit isLoading={isLoading} />
      </SimpleGrid>

      <SubmitButton isLoading={isLoading} />
    </FormComponents.Form>
  );
};

export default JobsiteContractForm;
