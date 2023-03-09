import React from "react";
import { useVehicleIssueForm } from "../../../forms/vehicleIssue";
import { VehicleCardSnippetFragment } from "../../../generated/graphql";
import SubmitButton from "../../Common/forms/SubmitButton";

interface IVehicleIssueCreateForm {
  vehicle: VehicleCardSnippetFragment;
  onSubmit?: (vehicleIssueId: string) => void;
}

const VehicleIssueCreateForm = ({ vehicle }: IVehicleIssueCreateForm) => {
  /**
   * --- Hook Initialization ---
   */

  const { FormComponents } = useVehicleIssueForm();

  const loading = false;

  /**
   * --- Rendering ---
   */

  return (
    <FormComponents.Form submitHandler={(data) => console.log(data)}>
      <FormComponents.Title isLoading={loading} />
      <FormComponents.Description isLoading={loading} />
      <FormComponents.Priority isLoading={loading} />
      <h3>
        Handle "Assigned To" (Users who are PM w/ Type 'VehicleMaintenance')
      </h3>
      <SubmitButton />
    </FormComponents.Form>
  );
};

export default VehicleIssueCreateForm;
