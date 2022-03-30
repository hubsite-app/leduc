import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Controller,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";
import * as yup from "yup";
import {
  JobsiteMaterialCardSnippetFragment,
  MaterialShipmentShipmentData,
  MaterialShipmentShipmentDataV1,
} from "../generated/graphql";

import TextField, { ITextField } from "../components/Common/forms/TextField";
import { IFormProps } from "../typescript/forms";
import MaterialSearch from "../components/Search/MaterialSearch";
import Select, { ISelect } from "../components/Common/forms/Select";
import Unit, { IUnit } from "../components/Common/forms/Unit";
import Number, { INumber } from "../components/Common/forms/Number";
import CompanySearch from "../components/Search/CompanySearch";

const MaterialShipmentUpdateV1 = yup
  .object()
  .shape({
    shipmentType: yup.string().required(),
    quantity: yup.number().required(),
    unit: yup.string().required(),
    startTime: yup.string().optional(),
    endTime: yup.string().optional(),
    supplier: yup.string().required(),
  })
  .required();

export const useMaterialShipmentUpdateFormV1 = (options?: UseFormProps) => {
  const form = useForm({
    resolver: yupResolver(MaterialShipmentUpdateV1),
    ...options,
  });

  const { control, handleSubmit, setValue } = form;

  const FormComponents = {
    Form: ({
      children,
      submitHandler,
    }: {
      children: React.ReactNode;
      submitHandler: SubmitHandler<MaterialShipmentShipmentDataV1>;
    }) => <form onSubmit={handleSubmit(submitHandler)}>{children}</form>,
    ShipmentType: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="shipmentType"
            render={({ field, fieldState }) => (
              <MaterialSearch
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="Shipment Type"
                isDisabled={isLoading}
                materialSelected={(material) =>
                  setValue("shipmentType", material.name)
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
              <CompanySearch
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="Supplier"
                isDisabled={isLoading}
                companySelected={(company) => {
                  setValue("supplier", company.name);
                }}
              />
            )}
          />
        ),
        [isLoading, props]
      ),
    StartTime: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="startTime"
            render={({ field, fieldState }) => {
              return (
                <TextField
                  {...props}
                  {...field}
                  type="time"
                  errorMessage={fieldState.error?.message}
                  label="Start Time (Optional)"
                  isDisabled={isLoading}
                />
              );
            }}
          />
        ),
        [isLoading, props]
      ),
    EndTime: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="endTime"
            render={({ field, fieldState }) => (
              <TextField
                {...props}
                {...field}
                type="time"
                errorMessage={fieldState.error?.message}
                label="End Time (Optional)"
                isDisabled={isLoading}
              />
            )}
          />
        ),
        [isLoading, props]
      ),
    Quantity: ({ isLoading, ...props }: IFormProps<INumber>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="quantity"
            render={({ field, fieldState }) => (
              <Number
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="Quantity"
                isDisabled={isLoading}
              />
            )}
          />
        ),
        [isLoading, props]
      ),
    Unit: ({ isLoading, ...props }: IFormProps<IUnit>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="unit"
            render={({ field, fieldState }) => (
              <Unit
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
  };

  return {
    FormComponents,
    ...form,
  };
};

const MaterialShipmentUpdate = yup
  .object()
  .shape({
    jobsiteMaterialId: yup.string().required(),
    quantity: yup.number().required(),
    startTime: yup.string().optional(),
    endTime: yup.string().optional(),
  })
  .required();

export const useMaterialShipmentUpdateForm = (options?: UseFormProps) => {
  const form = useForm({
    resolver: yupResolver(MaterialShipmentUpdate),
    ...options,
  });

  const { control, handleSubmit } = form;

  const FormComponents = {
    Form: ({
      children,
      submitHandler,
    }: {
      children: React.ReactNode;
      submitHandler: SubmitHandler<MaterialShipmentShipmentData>;
    }) => <form onSubmit={handleSubmit(submitHandler)}>{children}</form>,
    JobsiteMaterial: ({
      isLoading,
      jobsiteMaterials,
      ...props
    }: IFormProps<Omit<ISelect, "options">> & {
      jobsiteMaterials: JobsiteMaterialCardSnippetFragment[];
    }) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="jobsiteMaterialId"
            render={({ field, fieldState }) => (
              <Select
                {...props}
                {...field}
                options={jobsiteMaterials.map((material) => {
                  return {
                    title: `${material.material.name} - ${material.supplier.name}`,
                    value: material._id,
                  };
                })}
                errorMessage={fieldState.error?.message}
                label="Material"
                isDisabled={isLoading}
              />
            )}
          />
        ),
        [isLoading, jobsiteMaterials, props]
      ),
    StartTime: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="startTime"
            render={({ field, fieldState }) => {
              return (
                <TextField
                  {...props}
                  {...field}
                  type="time"
                  errorMessage={fieldState.error?.message}
                  label="Start Time (Optional)"
                  isDisabled={isLoading}
                />
              );
            }}
          />
        ),
        [isLoading, props]
      ),
    EndTime: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="endTime"
            render={({ field, fieldState }) => (
              <TextField
                {...props}
                {...field}
                type="time"
                errorMessage={fieldState.error?.message}
                label="End Time (Optional)"
                isDisabled={isLoading}
              />
            )}
          />
        ),
        [isLoading, props]
      ),
    Quantity: ({ isLoading, ...props }: IFormProps<INumber>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="quantity"
            render={({ field, fieldState }) => (
              <Number
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="Quantity"
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
