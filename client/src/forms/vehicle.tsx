import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Controller,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";
import * as yup from "yup";
import { VehicleCreateData } from "../generated/graphql";
import { IFormProps } from "../typescript/forms";
import TextField, { ITextField } from "../components/Common/forms/TextField";
import Select, { ISelect } from "../components/Common/forms/Select";
import { MaterialShipmentVehicleTypes } from "../constants/select";

const VehicleCreate = yup
  .object()
  .shape({
    name: yup.string().required("please provide a name"),
    vehicleCode: yup.string().required("please provide a vehicle code"),
    vehicleType: yup.string().required("please provide a vehicle type"),
  })
  .required();

export const useVehicleCreateForm = (options?: UseFormProps) => {
  const form = useForm({
    resolver: yupResolver(VehicleCreate),
    ...options,
  });

  const { handleSubmit, control } = form;

  const FormComponents = {
    Form: ({
      children,
      submitHandler,
    }: {
      children: React.ReactNode;
      submitHandler: SubmitHandler<VehicleCreateData>;
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
    VehicleCode: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="vehicleCode"
            render={({ field, fieldState }) => (
              <TextField
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="Vehicle Code"
                isDisabled={isLoading}
              />
            )}
          />
        ),
        [isLoading, props]
      ),
    VehicleType: ({
      isLoading,
      ...props
    }: IFormProps<Omit<ISelect, "options" | "name">>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="vehicleType"
            defaultValue={MaterialShipmentVehicleTypes[0]}
            render={({ field, fieldState }) => (
              <Select
                {...props}
                {...field}
                options={MaterialShipmentVehicleTypes.map((type) => {
                  return { value: type, title: type };
                })}
                errorMessage={fieldState.error?.message}
                label="Vehicle Type"
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
