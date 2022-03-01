import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Controller,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";
import * as yup from "yup";

import TextField from "../components/Common/forms/TextField";
import { DailyReportUpdateData } from "../generated/graphql";

const DailyReportUpdate = yup
  .object()
  .shape({
    date: yup.date().required().typeError("must provide a valid date"),
  })
  .required();

export const useDailyReportUpdateForm = (options?: UseFormProps) => {
  const form = useForm({
    resolver: yupResolver(DailyReportUpdate),
    ...options,
  });

  const { handleSubmit, control } = form;

  const FormComponents = {
    Form: ({
      children,
      submitHandler,
    }: {
      children: React.ReactNode;
      submitHandler: SubmitHandler<DailyReportUpdateData>;
    }) => <form onSubmit={handleSubmit(submitHandler)}>{children}</form>,
    Date: ({
      isLoading,
      defaultValue,
    }: {
      isLoading?: boolean;
      defaultValue?: string;
    }) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="date"
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="date"
                label="Date"
                errorMessage={fieldState.error?.message}
                isDisabled={isLoading}
              />
            )}
          />
        ),
        [defaultValue, isLoading]
      ),
  };

  return {
    ...form,
    FormComponents,
  };
};
