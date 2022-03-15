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
import {
  DailyReportCreateData,
  DailyReportUpdateData,
} from "../generated/graphql";
import { IFormProps } from "../typescript/forms";
import CrewSearch from "../components/Search/CrewSearch";
import JobsiteSearch from "../components/Search/JobsiteSearch";

const DailyReportCreate = yup
  .object()
  .shape({
    crewId: yup.string().required("please select a crew"),
    jobsiteId: yup.string().required("please select a jobsite"),
    date: yup.date().required().typeError("please provide a valid date"),
  })
  .required();

export const useDailyReportCreateForm = (options?: UseFormProps) => {
  const form = useForm({
    resolver: yupResolver(DailyReportCreate),
    ...options,
  });

  const { handleSubmit, control } = form;

  const FormComponents = {
    Form: ({
      children,
      submitHandler,
    }: {
      children: React.ReactNode;
      submitHandler: SubmitHandler<DailyReportCreateData>;
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
    Crew: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="crewId"
            render={({ field, fieldState }) => (
              <CrewSearch
                {...props}
                name={field.name}
                onBlur={field.onBlur}
                label="Crew"
                crewSelected={(crew) => field.onChange(crew._id)}
                errorMessage={fieldState.error?.message}
                isDisabled={isLoading}
              />
            )}
          />
        ),
        [isLoading, props]
      ),
    Jobsite: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="jobsiteId"
            render={({ field, fieldState }) => (
              <JobsiteSearch
                {...props}
                name={field.name}
                onBlur={field.onBlur}
                label="Jobsite"
                jobsiteSelected={(jobsite) => field.onChange(jobsite._id)}
                errorMessage={fieldState.error?.message}
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
