import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
} from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import React from "react";
import { useVehicleIssueForm } from "../../../forms/vehicleIssue";
import {
  Exact,
  OperatorDailyReportCardSnippetFragment,
  useVehicleIssueCreateMutation,
  VehicleCardSnippetFragment,
  VehicleIssueCreateData,
  VehicleIssueCreateMutation,
} from "../../../generated/graphql";
import SubmitButton from "../../Common/forms/SubmitButton";

interface IVehicleIssueCreateForm {
  vehicle: VehicleCardSnippetFragment;
  operatorDailyReport?: OperatorDailyReportCardSnippetFragment;
  onSubmit?: (vehicleIssueId: string) => void;
  mutationOptions?: MutationHookOptions<
    VehicleIssueCreateMutation,
    Exact<{
      data: VehicleIssueCreateData;
      vehicleId: string;
    }>,
    DefaultContext,
    ApolloCache<any>
  >;
}

const VehicleIssueCreateForm = ({
  vehicle,
  operatorDailyReport,
  onSubmit,
  mutationOptions,
}: IVehicleIssueCreateForm) => {
  /**
   * --- Hook Initialization ---
   */

  const toast = useToast();

  const { FormComponents } = useVehicleIssueForm();

  const [create, { loading }] = useVehicleIssueCreateMutation(mutationOptions);

  /**
   * --- Functions ---
   */

  const handleSubmit = async (data: VehicleIssueCreateData) => {
    try {
      const res = await create({
        variables: {
          vehicleId: vehicle._id,
          data: {
            operatorDailyReport: operatorDailyReport?._id,
            ...data,
          },
        },
      });

      if (res.data?.vehicleIssueCreate) {
        onSubmit && onSubmit(res.data.vehicleIssueCreate._id);
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
  };

  /**
   * --- Rendering ---
   */

  return (
    <FormComponents.Form submitHandler={handleSubmit}>
      <FormComponents.Title isLoading={loading} />
      <FormComponents.Description isLoading={loading} />
      <FormComponents.Priority isLoading={loading} />
      <FormComponents.AssignedTo isLoading={loading} />
      <SubmitButton />
    </FormComponents.Form>
  );
};

export default VehicleIssueCreateForm;
