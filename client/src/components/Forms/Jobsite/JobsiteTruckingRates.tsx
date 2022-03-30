import { useToast } from "@chakra-ui/react";
import React from "react";
import { useSystem } from "../../../contexts/System";
import {
  JobsiteFullSnippetFragment,
  useJobsiteSetTruckingRatesMutation,
} from "../../../generated/graphql";
import DefaultRates from "../../Common/forms/DefaultRates";
import SubmitButton from "../../Common/forms/SubmitButton";

interface IJobsiteTruckingRates {
  jobsite: JobsiteFullSnippetFragment;
  onSuccess?: () => void;
}

const JobsiteTruckingRates = ({
  jobsite,
  onSuccess,
}: IJobsiteTruckingRates) => {
  /**
   * ----- Hook Initialization -----
   */

  const toast = useToast();

  const {
    state: { system },
  } = useSystem();

  const [defaultRates, setDefaults] = React.useState(
    jobsite.truckingRates.length > 0
      ? jobsite.truckingRates
      : system!.materialShipmentVehicleTypeDefaults
  );

  const [setRates, { loading }] = useJobsiteSetTruckingRatesMutation();

  /**
   * ----- Functions -----
   */

  const handleSubmit = React.useCallback(async () => {
    try {
      const res = await setRates({
        variables: {
          data: defaultRates,
          id: jobsite._id,
        },
      });

      if (res.data?.jobsiteSetTruckingRates) {
        if (onSuccess) onSuccess();
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
  }, [defaultRates, jobsite._id, onSuccess, setRates, toast]);

  /**
   * ----- Rendering -----
   */

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <DefaultRates
        defaultRates={defaultRates}
        onChange={(defaultRates) => setDefaults(defaultRates)}
        isLoading={loading}
      />
      <SubmitButton isLoading={loading} />
    </form>
  );
};

export default JobsiteTruckingRates;
