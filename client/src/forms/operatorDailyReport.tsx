import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";
import * as z from "zod";

import { IFormProps } from "../typescript/forms";
import TextField, { ITextField } from "../components/Common/forms/TextField";
import CompanySearch from "../components/Search/CompanySearch";
import NumberForm, { INumber } from "../components/Common/forms/Number";
import TextArea, { ITextArea } from "../components/Common/forms/TextArea";
import Checkbox, { ICheckbox } from "../components/Common/forms/Checkbox";
import { OperatorDailyReportData } from "../components/pages/playground";

const OperatorDailyReportSchema = z.object({
  vehicleId: z.string().min(1, { message: "Must provide a vehicle id" }),
  startTime: z
    .string({ required_error: "Must provide a start time" })
    .datetime()
    .default(new Date().toISOString()),
  odometer: z.number({ required_error: "Must provide an odometer reading" }),
  checklist: z
    .object({
      walkAroundComplete: z.boolean().default(false),
      visualInspectionComplete: z.boolean().default(false),
      oilChecked: z.boolean().default(false),
      coolantChecked: z.boolean().default(false),
      fluidsChecked: z.boolean().default(false),
    })
    .required(),
  properFunction: z.boolean().default(false),
  wasDamageObserved: z.boolean().default(false),
  damageObserved: z.string().optional(),
  wereLeaksFound: z.boolean().default(false),
  leaksFound: z.array(
    z.object({
      type: z.string({ required_error: "Must provide the type of fluid" }),
      location: z.string({
        required_error: "Must provide the location of the leak",
      }),
    })
  ),
  fluidsAdded: z.array(
    z.object({
      type: z.string({
        required_error: "Must provide the type of fluid added",
      }),
      litres: z.number({
        required_error: "Must provide the number of litres added",
      }),
    })
  ),
  functionChecks: z.object({
    backupAlarmFunctional: z.boolean().default(false),
    lightsFunctional: z.boolean().default(false),
    fireExtinguisherFunctional: z.boolean().default(false),
    licensePlateFunctional: z.boolean().default(false),
  }),
  notes: z.string().optional(),
});

export const useOperatorDailyReportForm = (options?: UseFormProps) => {
  const form = useForm({
    resolver: zodResolver(OperatorDailyReportSchema),
    defaultValues: {
      odometer: 0,
      startTime: new Date(),
      ...options?.defaultValues,
    },
    ...options,
  });

  const { handleSubmit, control, watch } = form;

  const wasDamageObserved = watch("wasDamageObserved");

  const FormComponents = {
    Form: ({
      children,
      submitHandler,
    }: {
      children: React.ReactNode;
      submitHandler: SubmitHandler<OperatorDailyReportData>;
    }) => <form onSubmit={handleSubmit(submitHandler)}>{children}</form>,
    Odometer: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="odometer"
            render={({ field, fieldState }) => (
              <TextField
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="Odometer Reading"
                isDisabled={isLoading}
                type="number"
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
            render={({ field, fieldState }) => (
              <TextField
                {...props}
                {...field}
                type="time"
                errorMessage={fieldState.error?.message}
                label="Start Time"
                isDisabled={isLoading}
              />
            )}
          />
        ),
        [isLoading, props]
      ),
    Checklist: {
      WalkAround: ({ isLoading, ...props }: IFormProps<ICheckbox>) =>
        React.useMemo(
          () => (
            <Controller
              control={control}
              name="checklist.walkAroundComplete"
              render={({ field }) => (
                <Checkbox
                  {...props}
                  {...field}
                  isDisabled={isLoading}
                  isChecked={field.value}
                >
                  Walk Around Complete
                </Checkbox>
              )}
            />
          ),
          [isLoading, props]
        ),
      VisualInspection: ({ isLoading, ...props }: IFormProps<ICheckbox>) =>
        React.useMemo(
          () => (
            <Controller
              control={control}
              name="checklist.visualInspectionComplete"
              render={({ field }) => (
                <Checkbox
                  {...props}
                  {...field}
                  isDisabled={isLoading}
                  isChecked={field.value}
                >
                  Visual Inspection Complete
                </Checkbox>
              )}
            />
          ),
          [isLoading, props]
        ),
      Oil: ({ isLoading, ...props }: IFormProps<ICheckbox>) =>
        React.useMemo(
          () => (
            <Controller
              control={control}
              name="checklist.oilChecked"
              render={({ field }) => (
                <Checkbox
                  {...props}
                  {...field}
                  isDisabled={isLoading}
                  isChecked={field.value}
                >
                  Oil Checked
                </Checkbox>
              )}
            />
          ),
          [isLoading, props]
        ),
      Coolant: ({ isLoading, ...props }: IFormProps<ICheckbox>) =>
        React.useMemo(
          () => (
            <Controller
              control={control}
              name="checklist.coolantChecked"
              render={({ field }) => (
                <Checkbox
                  {...props}
                  {...field}
                  isDisabled={isLoading}
                  isChecked={field.value}
                >
                  Coolant Checked
                </Checkbox>
              )}
            />
          ),
          [isLoading, props]
        ),
      Fluids: ({ isLoading, ...props }: IFormProps<ICheckbox>) =>
        React.useMemo(
          () => (
            <Controller
              control={control}
              name="checklist.fluidsChecked"
              render={({ field }) => (
                <Checkbox
                  {...props}
                  {...field}
                  isDisabled={isLoading}
                  isChecked={field.value}
                >
                  Fluids Checked
                </Checkbox>
              )}
            />
          ),
          [isLoading, props]
        ),
    },
    ProperFunction: ({ isLoading, ...props }: IFormProps<ICheckbox>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="properFunction"
            render={({ field }) => (
              <Checkbox
                {...props}
                {...field}
                isDisabled={isLoading}
                isChecked={field.value}
              >
                Is the machine functioning properly?
              </Checkbox>
            )}
          />
        ),
        [isLoading, props]
      ),
    WasDamageObserved: ({ isLoading, ...props }: IFormProps<ICheckbox>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="wasDamageObserved"
            render={({ field }) => (
              <Checkbox
                {...props}
                {...field}
                isDisabled={isLoading}
                isChecked={field.value}
              >
                Was damage observed?
              </Checkbox>
            )}
          />
        ),
        [isLoading, props]
      ),
    DamageObserved: ({ isLoading, ...props }: IFormProps<ITextArea>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="damageObserved"
            render={({ field, fieldState }) => (
              <TextArea
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="What damage was observed?"
                isDisabled={isLoading}
              />
            )}
          />
        ),
        [isLoading, props]
      ),
    WereLeaksObserved: ({ isLoading, ...props }: IFormProps<ICheckbox>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="wereLeaksFound"
            render={({ field }) => (
              <Checkbox
                {...props}
                {...field}
                isDisabled={isLoading}
                isChecked={field.value}
              >
                Fluid leaks found?
              </Checkbox>
            )}
          />
        ),
        [isLoading, props]
      ),
  };

  return { ...form, wasDamageObserved, FormComponents };
};
