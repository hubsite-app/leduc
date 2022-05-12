import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Controller,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";
import * as yup from "yup";

import { IFormProps } from "../typescript/forms";
import TextField, { ITextField } from "../components/Common/forms/TextField";
import MaterialSearch from "../components/Search/MaterialSearch";
import CompanySearch from "../components/Search/CompanySearch";
import {
  JobsiteMaterialCreateData,
  JobsiteMaterialUpdateData,
} from "../generated/graphql";
import NumberForm, { INumber } from "../components/Common/forms/Number";
import Units, { IUnit } from "../components/Common/forms/Unit";
import Rates, { IRates } from "../components/Common/forms/Rates";
import { DefaultRatesSchema, RatesSchema } from "./yupSchema";
import Checkbox, { ICheckbox } from "../components/Common/forms/Checkbox";
import DefaultRates, {
  IDefaultRateError,
  IDefaultRates,
} from "../components/Common/forms/DefaultRates";

const defaultRates = [
  {
    rate: 0,
    date: new Date(),
  },
];

const defaultDeliveredRates = [
  {
    title: "",
    rates: defaultRates,
  },
];

const JobsiteMaterialCreateSchema = yup
  .object()
  .shape({
    materialId: yup.string().required("please enter a material"),
    supplierId: yup.string().required("please enter a supplier"),
    quantity: yup.number().required("please enter a quantity"),
    unit: yup.string().required("please enter a unit"),
    rates: RatesSchema,
    delivered: yup.boolean().required(),
    deliveredRates: DefaultRatesSchema,
  })
  .required();

export const useJobsiteMaterialCreateForm = (options?: UseFormProps) => {
  const form = useForm({
    resolver: yupResolver(JobsiteMaterialCreateSchema),
    defaultValues: {
      quantity: 0,
      rates: defaultRates,
      delivered: false,
      deliveredRates: defaultDeliveredRates,
      ...options?.defaultValues,
    },
    ...options,
  });

  const { handleSubmit, control, setValue, watch } = form;

  const delivered: boolean = watch("delivered");

  React.useEffect(() => {
    if (delivered) {
      setValue("rates", []);
      setValue("deliveredRates", defaultDeliveredRates);
    } else {
      setValue("deliveredRates", []);
      setValue("rates", defaultRates);
    }
  }, [delivered, setValue]);

  const FormComponents = {
    Form: ({
      children,
      submitHandler,
    }: {
      children: React.ReactNode;
      submitHandler: SubmitHandler<JobsiteMaterialCreateData>;
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
            name="supplierId"
            render={({ field, fieldState }) => (
              <CompanySearch
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="Supplier"
                isDisabled={isLoading}
                companySelected={(company) =>
                  setValue("supplierId", company._id)
                }
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
              <NumberForm
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
              <Units
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
    Rates: ({ isLoading, ...props }: IFormProps<Omit<IRates, "rates">>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="rates"
            render={({ field, fieldState }) => (
              <Rates
                {...props}
                {...field}
                label="Rates"
                rates={field.value}
                errors={fieldState.error as any}
                isLoading={isLoading}
              />
            )}
          />
        ),
        [isLoading, props]
      ),
    Delivered: ({ isLoading, ...props }: IFormProps<ICheckbox>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="delivered"
            render={({ field }) => (
              <Checkbox
                {...props}
                {...field}
                isChecked={field.value}
                isDisabled={isLoading}
              >
                Delivered
              </Checkbox>
            )}
          />
        ),
        [isLoading, props]
      ),
    DeliveredRates: ({
      ...props
    }: IFormProps<Omit<IDefaultRates, "defaultRates">>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="deliveredRates"
            render={({ field, fieldState }) => (
              <DefaultRates
                {...field}
                {...props}
                errors={fieldState.error as IDefaultRateError[] | undefined}
                titleName="Trucking Type"
                defaultRates={field.value}
              />
            )}
          />
        ),
        [props]
      ),
  };

  return {
    FormComponents,
    delivered,
    ...form,
  };
};

const JobsiteMaterialUpdateSchema = yup
  .object()
  .shape({
    supplierId: yup.string().required("please enter a supplier"),
    quantity: yup.number().required("please enter a quantity"),
    unit: yup.string().required("please enter a unit"),
    rates: RatesSchema,
    delivered: yup.boolean().required(),
    deliveredRates: DefaultRatesSchema,
  })
  .required();

export const useJobsiteMaterialUpdateForm = (options?: UseFormProps) => {
  const form = useForm({
    resolver: yupResolver(JobsiteMaterialUpdateSchema),
    defaultValues: {
      quantity: 0,
      rates: defaultRates,
      delivered: false,
      deliveredRates: defaultDeliveredRates,
      ...options?.defaultValues,
    },
    ...options,
  });

  const { handleSubmit, control, setValue, watch, formState } = form;

  const delivered: boolean = watch("delivered");

  const FormComponents = {
    Form: ({
      children,
      submitHandler,
    }: {
      children: React.ReactNode;
      submitHandler: SubmitHandler<JobsiteMaterialUpdateData>;
    }) => <form onSubmit={handleSubmit(submitHandler)}>{children}</form>,
    Supplier: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="supplierId"
            render={({ field, fieldState }) => (
              <CompanySearch
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="Supplier"
                isDisabled={isLoading}
                companySelected={(company) =>
                  setValue("supplierId", company._id)
                }
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
              <NumberForm
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
              <Units
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
    Rates: ({ isLoading, ...props }: IFormProps<Omit<IRates, "rates">>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="rates"
            render={({ field, fieldState }) => (
              <Rates
                {...props}
                {...field}
                label="Rates"
                rates={field.value}
                errors={fieldState.error as any}
                isLoading={isLoading}
              />
            )}
          />
        ),
        [isLoading, props]
      ),
    Delivered: ({ isLoading, ...props }: IFormProps<ICheckbox>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="delivered"
            render={({ field }) => (
              <Checkbox
                {...props}
                {...field}
                isChecked={field.value}
                isDisabled={isLoading}
              >
                Delivered
              </Checkbox>
            )}
          />
        ),
        [isLoading, props]
      ),
    DeliveredRates: ({
      ...props
    }: IFormProps<Omit<IDefaultRates, "defaultRates">>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="deliveredRates"
            render={({ field, fieldState }) => (
              <DefaultRates
                {...field}
                {...props}
                errors={fieldState.error as IDefaultRateError[] | undefined}
                titleName="Trucking Type"
                defaultRates={field.value}
              />
            )}
          />
        ),
        [props]
      ),
  };

  return {
    FormComponents,
    delivered,
    ...form,
  };
};
