import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Controller,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";
import * as yup from "yup";
import { MaterialShipmentShipmentDataV1 } from "../generated/graphql";

import TextField, { ITextField } from "../components/Common/forms/TextField";
import { IFormProps } from "../typescript/forms";
import MaterialSearch from "../components/Search/MaterialSearch";

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
  };

  return {
    FormComponents,
    ...form,
  };
};
