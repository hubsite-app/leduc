import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Controller,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";
import * as yup from "yup";

import TextField, { ITextField } from "../components/Common/forms/TextField";
import { JobsiteCreateData } from "../generated/graphql";
import { IFormProps } from "../typescript/forms";
import TextArea, { ITextArea } from "../components/Common/forms/TextArea";
import MaterialSearch from "../components/Search/MaterialSearch";

const JobsiteCreate = yup
  .object()
  .shape({
    name: yup.string().required("please provide a name"),
    jobcode: yup.string().required("please enter a jobcode"),
    description: yup.string(),
  })
  .required();

export const useJobsiteCreateForm = (options?: UseFormProps) => {
  const form = useForm({
    resolver: yupResolver(JobsiteCreate),
    ...options,
  });

  const { handleSubmit, control } = form;

  const FormComponents = {
    Form: ({
      children,
      submitHandler,
    }: {
      children: React.ReactNode;
      submitHandler: SubmitHandler<JobsiteCreateData>;
    }) => <form onSubmit={handleSubmit(submitHandler)}>{children}</form>,
    Name: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <TextField
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="Name"
                isDisabled={isLoading}
              />
            )}
          />
        ),
        [isLoading, props]
      ),
    Jobcode: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="jobcode"
            render={({ field, fieldState }) => (
              <TextField
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="Jobcode"
                isDisabled={isLoading}
                placeholder="22-001"
              />
            )}
          />
        ),
        [isLoading, props]
      ),
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
                label="Description"
                isDisabled={isLoading}
              />
            )}
          />
        ),
        [isLoading, props]
      ),
  };

  return {
    FormComponents,
    ...form,
  };
};

const JobsiteMaterialCreateSchema = yup
  .object()
  .shape({
    materialId: yup.string().required("please enter a material"),
    supplier: yup.string().required("please enter a supplier"),
    quantity: yup.number().required("please enter a quantity"),
    unit: yup.number().required("please enter a unit"),
    rate: yup.number().required("please enter a rate"),
  })
  .required();

export const useJobsiteMaterialCreateForm = (options?: UseFormProps) => {
  const form = useForm({
    resolver: yupResolver(JobsiteMaterialCreateSchema),
    ...options,
  });

  const { handleSubmit, control, setValue } = form;

  const FormComponents = {
    Form: ({
      children,
      submitHandler,
    }: {
      children: React.ReactNode;
      submitHandler: SubmitHandler<{
        materialId: string;
        supplier: string;
        quantity: number;
        unit: string;
        rate: number;
      }>;
    }) => <form onSubmit={handleSubmit(submitHandler)}>{children}</form>,
    Material: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="materialId"
            render={({ field, fieldState }) => (
              <MaterialSearch
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="Material"
                isDisabled={isLoading}
                materialSelected={(material) =>
                  setValue("materialId", material._id)
                }
              />
            )}
          />
        ),
        [isLoading, props]
      ),
    Supplier: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="supplier"
            render={({ field, fieldState }) => (
              <TextField
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="Supplier"
                isDisabled={isLoading}
              />
            )}
          />
        ),
        [isLoading, props]
      ),
    Quantity: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="quantity"
            render={({ field, fieldState }) => (
              <TextField
                {...props}
                {...field}
                type="number"
                errorMessage={fieldState.error?.message}
                label="Quantity"
                isDisabled={isLoading}
              />
            )}
          />
        ),
        [isLoading, props]
      ),
    Unit: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="unit"
            render={({ field, fieldState }) => (
              <TextField
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="Unit"
                isDisabled={isLoading}
              />
            )}
          />
        ),
        [isLoading, props]
      ),
    Rate: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="rate"
            render={({ field, fieldState }) => (
              <TextField
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="Rate"
                type="number"
                isDisabled={isLoading}
                inputRightAddon={"$"}
              />
            )}
          />
        ),
        [isLoading, props]
      ),
  };

  return {
    FormComponents,
    ...form,
  };
};
