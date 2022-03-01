import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Controller,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";
import * as yup from "yup";

import { LoginData } from "../generated/graphql";
import TextField from "../components/Common/forms/TextField";
import Checkbox from "../components/Common/forms/Checkbox";

const UserLoginSchema = yup
  .object()
  .shape({
    email: yup.string().email("Not a valid email").required(),
    password: yup.string().required(),
    rememberMe: yup.boolean().default(true).required(),
  })
  .required();

export const useUserLoginForm = (options?: UseFormProps) => {
  const form = useForm({
    resolver: yupResolver(UserLoginSchema),
    ...options,
  });

  const { handleSubmit, control } = form;

  const FormComponents = {
    Form: ({
      children,
      submitHandler,
    }: {
      children: React.ReactNode;
      submitHandler: SubmitHandler<LoginData>;
    }) => <form onSubmit={handleSubmit(submitHandler)}>{children}</form>,
    Email: ({ isLoading }: { isLoading?: boolean }) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email"
                errorMessage={fieldState.error?.message}
                isDisabled={isLoading}
                bgColor="white"
              />
            )}
          />
        ),
        [isLoading]
      ),
    Password: ({ isLoading }: { isLoading?: boolean }) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                errorMessage={fieldState.error?.message}
                isDisabled={isLoading}
                bgColor="white"
              />
            )}
          />
        ),
        [isLoading]
      ),
    RememberMe: ({ isLoading }: { isLoading?: boolean }) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="rememberMe"
            render={({ field }) => (
              <Checkbox {...field} isDisabled={isLoading}>
                Remember Me
              </Checkbox>
            )}
          />
        ),
        [isLoading]
      ),
  };

  return {
    FormComponents,
    ...form,
  };
};
