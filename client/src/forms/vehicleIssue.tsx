import React from "react";

import {
  Controller,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  VehicleIssueCreateData,
  VehicleIssuePriority,
} from "../generated/graphql";
import TextField, { ITextField } from "../components/Common/forms/TextField";
import { IFormProps } from "../typescript/forms";
import TextArea, { ITextArea } from "../components/Common/forms/TextArea";
import VehicleIssuePrioritySelect, {
  IVehicleIssuePrioritySelect,
} from "../components/Forms/VehicleIssue/PrioritySelect";

const VehicleIssueSchema = yup.object().shape({
  title: yup.string().required("Please provide a title"),
  description: yup
    .string()
    .required("Please provide a description of the issue"),
  priority: yup
    .string()
    .required("Please provide a priority")
    .default(VehicleIssuePriority.P2),
  assignedTo: yup.string(),
});

export const useVehicleIssueForm = (options?: UseFormProps) => {
  /**
   * --- Hook Initialization ---
   */

  const form = useForm({
    resolver: yupResolver(VehicleIssueSchema),
    defaultValues: {
      title: "",
      description: "",
      ...options?.defaultValues,
    },
    ...options,
  });

  /**
   * --- Variables ---
   */

  const { handleSubmit, control } = form;

  /**
   * --- Components ---
   */

  const FormComponents = {
    Form: ({
      children,
      submitHandler,
    }: {
      children: React.ReactNode;
      submitHandler: SubmitHandler<VehicleIssueCreateData>;
    }) => <form onSubmit={handleSubmit(submitHandler)}>{children}</form>,
    Title: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(() => {
        return (
          <Controller
            control={control}
            name={"title"}
            render={({ field, fieldState }) => (
              <TextField
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="Title"
                isDisabled={isLoading || props.isDisabled}
              />
            )}
          />
        );
      }, [isLoading, props]),
    Description: ({ isLoading, ...props }: IFormProps<ITextArea>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="description"
            render={({ field, fieldState }) => (
              <TextArea
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                isDisabled={isLoading}
                label="Description"
              />
            )}
          />
        ),
        [isLoading, props]
      ),
    Priority: ({
      isLoading,
      ...props
    }: IFormProps<IVehicleIssuePrioritySelect>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="priority"
            render={({ field, fieldState }) => (
              <VehicleIssuePrioritySelect
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                isDisabled={isLoading}
                label="Priority"
              />
            )}
          />
        ),
        [isLoading, props]
      ),
  };

  return { ...form, FormComponents };
};
