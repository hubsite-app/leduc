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
import { CrewCreateData } from "../generated/graphql";
import { IFormProps } from "../typescript/forms";
import Select, { ISelect } from "../components/Common/forms/Select";
import { CrewTypes } from "../constants/select";

const CrewCreate = yup
  .object()
  .shape({
    name: yup.string().required("please provide a name"),
    type: yup.string().required("please enter a crew type"),
  })
  .required();

export const useCrewCreateForm = (options?: UseFormProps) => {
  const form = useForm({
    resolver: yupResolver(CrewCreate),
    ...options,
  });

  const { handleSubmit, control } = form;

  const FormComponents = {
    Form: ({
      children,
      submitHandler,
    }: {
      children: React.ReactNode;
      submitHandler: SubmitHandler<CrewCreateData>;
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
    Type: ({
      isLoading,
      ...props
    }: IFormProps<Omit<ISelect, "options" | "name">>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="type"
            defaultValue="Base"
            render={({ field, fieldState }) => (
              <Select
                {...props}
                {...field}
                options={CrewTypes.map((type) => {
                  return { value: type, title: type };
                })}
                errorMessage={fieldState.error?.message}
                label="Crew Type"
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
