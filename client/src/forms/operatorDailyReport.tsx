import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
  UseFormProps,
} from "react-hook-form";
import * as z from "zod";

import { IFormProps } from "../typescript/forms";
import TextField, { ITextField } from "../components/Common/forms/TextField";
import NumberForm, { INumber } from "../components/Common/forms/Number";
import TextArea, { ITextArea } from "../components/Common/forms/TextArea";
import Checkbox, { ICheckbox } from "../components/Common/forms/Checkbox";
import { OperatorDailyReportData } from "../components/pages/playground";
import { Box, Button, Flex, Icon, IconButton } from "@chakra-ui/react";
import Card from "../components/Common/Card";
import { FiPlus, FiX } from "react-icons/fi";

const OperatorDailyReportSchema = z.object({
  vehicleId: z.string().min(1, { message: "Must provide a vehicle id" }),
  startTime: z
    .string({ required_error: "Must provide a start time" })
    .datetime()
    .default(new Date().toISOString()),
  odometer: z
    .number({ required_error: "Must provide an odometer reading" })
    .min(0, { message: "Must be greater than 0" }),
  checklist: z
    .object({
      walkAroundComplete: z.boolean().default(false),
      visualInspectionComplete: z.boolean().default(false),
      oilChecked: z.boolean().default(false),
      coolantChecked: z.boolean().default(false),
      fluidsChecked: z.boolean().default(false),
    })
    .required(),
  oilAdded: z.number(),
  coolantAdded: z.number(),
  properFunction: z.boolean().default(false),
  wasDamageObserved: z.boolean().default(false),
  damageObserved: z.string().optional(),
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
      amount: z.number({
        required_error: "Must provide the number of litres added",
      }),
    })
  ),
  functionChecks: z.object({
    backupAlarm: z.boolean().default(false),
    lights: z.boolean().default(false),
    fireExtinguisher: z.boolean().default(false),
    licensePlate: z.boolean().default(false),
  }),
  notes: z.string().optional(),
});

export const useOperatorDailyReportForm = (options?: UseFormProps) => {
  /**
   * ----- Hook Initialization -----
   */

  const form = useForm({
    resolver: zodResolver(OperatorDailyReportSchema),
    defaultValues: {
      odometer: "",
      startTime: new Date(),
      leaksFound: [],
      fluidsAdded: [],
      oilAdded: 0,
      coolantAdded: 0,
      ...options?.defaultValues,
    },
    ...options,
  });

  /**
   * ----- Variables -----
   */

  const { handleSubmit, control, watch } = form;

  const {
    fields: leaksFoundFields,
    append: appendLeakFound,
    remove: removeLeakFound,
  } = useFieldArray({
    control,
    name: "leaksFound",
  });

  const {
    fields: fluidAddedFields,
    append: appendFluidAdded,
    remove: removeFluidAdded,
  } = useFieldArray({
    control,
    name: "fluidsAdded",
  });

  const wasDamageObserved = watch("wasDamageObserved");
  const oilChecked = watch("checklist.oilChecked");
  const coolantChecked = watch("checklist.coolantChecked");

  /**
   * ----- Functions -----
   */

  // const addLeakFound = React.useCallback(() => {
  //   setValue("leaksFound", [...leaksFound, { type: "", location: "" }]);
  // }, [leaksFound, setValue]);
  //
  // const removeLeakFound = React.useCallback(
  //   (index: number) => {
  //     const leaksFoundCopy = JSON.parse(JSON.stringify(leaksFound));
  //     leaksFoundCopy.splice(index, 1);
  //     setValue("leaksFound", leaksFoundCopy);
  //   },
  //   [leaksFound, setValue]
  // );

  /**
   * ----- Lifecycle -----
   */

  /*
   * ----- Components -----
   */

  const FormComponents = {
    Form: ({
      children,
      submitHandler,
    }: {
      children: React.ReactNode;
      submitHandler: SubmitHandler<OperatorDailyReportData>;
    }) => <form onSubmit={handleSubmit(submitHandler)}>{children}</form>,
    Odometer: ({ isLoading, ...props }: IFormProps<INumber>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="odometer"
            render={({ field, fieldState }) => (
              <NumberForm
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="Odometer Reading"
                isDisabled={isLoading}
                inputRightAddon="km"
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
    OilAdded: ({ isLoading, ...props }: IFormProps<INumber>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="oilAdded"
            render={({ field, fieldState }) => {
              if (oilChecked) {
                return (
                  <NumberForm
                    {...props}
                    {...field}
                    errorMessage={fieldState.error?.message}
                    label="Oil Added"
                    inputRightAddon="L"
                    isDisabled={isLoading}
                  />
                );
              } else return <Box display="none" />;
            }}
          />
        ),
        [isLoading, props]
      ),
    CoolantAdded: ({ isLoading, ...props }: IFormProps<INumber>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="coolantAdded"
            render={({ field, fieldState }) => {
              if (coolantChecked) {
                return (
                  <NumberForm
                    {...props}
                    {...field}
                    errorMessage={fieldState.error?.message}
                    label="Coolant Added"
                    inputRightAddon="L"
                    isDisabled={isLoading}
                  />
                );
              } else return <Box display="none" />;
            }}
          />
        ),
        [isLoading, props]
      ),
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
                Machine functioning properly?
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
    LeaksFound: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(() => {
        return (
          <Box>
            {leaksFoundFields.map((_, index) => (
              <Card key={index}>
                <Flex flexDir="row" w="100%">
                  <Box w="100%">
                    <Controller
                      control={control}
                      name={`leaksFound.${index}.type`}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...props}
                          {...field}
                          errorMessage={fieldState.error?.message}
                          label="Fluid Type"
                          isDisabled={isLoading}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`leaksFound.${index}.location`}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...props}
                          {...field}
                          errorMessage={fieldState.error?.message}
                          label="Leak Location"
                          isDisabled={isLoading}
                        />
                      )}
                    />
                  </Box>
                  <IconButton
                    onClick={() => removeLeakFound(index)}
                    aria-label="remove-leak"
                    icon={<FiX />}
                    backgroundColor="transparent"
                  />
                </Flex>
              </Card>
            ))}
            <Button
              onClick={() => appendLeakFound({ type: "", location: "" })}
              w="100%"
              backgroundColor="white"
            >
              Fluid Leak
              <Icon as={FiPlus} />
            </Button>
          </Box>
        );
      }, [isLoading, props]),
    FluidsAdded: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(() => {
        return (
          <Box>
            {fluidAddedFields.map((_, index) => (
              <Card key={index}>
                <Flex flexDir="row" w="100%">
                  <Box w="100%">
                    <Controller
                      control={control}
                      name={`fluidsAdded.${index}.type`}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...props}
                          {...field}
                          errorMessage={fieldState.error?.message}
                          label="Fluid type"
                          isDisabled={isLoading}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`fluidsAdded.${index}.amount`}
                      render={({ field, fieldState }) => (
                        <NumberForm
                          {...field}
                          errorMessage={fieldState.error?.message}
                          label="Amount added"
                          isDisabled={isLoading}
                          inputRightAddon="L"
                        />
                      )}
                    />
                  </Box>
                  <IconButton
                    onClick={() => removeFluidAdded(index)}
                    aria-label="remove-fluid"
                    icon={<FiX />}
                    backgroundColor="transparent"
                  />
                </Flex>
              </Card>
            ))}
            <Button
              onClick={() => appendFluidAdded({ type: "", amount: "" })}
              w="100%"
              backgroundColor="white"
            >
              Fluid Added
              <Icon as={FiPlus} />
            </Button>
          </Box>
        );
      }, [isLoading, props]),
    FunctionChecks: {
      BackupAlarm: ({ isLoading, ...props }: IFormProps<ICheckbox>) =>
        React.useMemo(
          () => (
            <Controller
              control={control}
              name="functionChecks.backupAlarm"
              render={({ field }) => (
                <Checkbox
                  {...props}
                  {...field}
                  isDisabled={isLoading}
                  isChecked={field.value}
                >
                  Backup alarm functioning properly?
                </Checkbox>
              )}
            />
          ),
          [isLoading, props]
        ),
      Lights: ({ isLoading, ...props }: IFormProps<ICheckbox>) =>
        React.useMemo(
          () => (
            <Controller
              control={control}
              name="functionChecks.lights"
              render={({ field }) => (
                <Checkbox
                  {...props}
                  {...field}
                  isDisabled={isLoading}
                  isChecked={field.value}
                >
                  All lights functioning properly?
                </Checkbox>
              )}
            />
          ),
          [isLoading, props]
        ),
      FireExtinguisher: ({ isLoading, ...props }: IFormProps<ICheckbox>) =>
        React.useMemo(
          () => (
            <Controller
              control={control}
              name="functionChecks.fireExtinguisher"
              render={({ field }) => (
                <Checkbox
                  {...props}
                  {...field}
                  isDisabled={isLoading}
                  isChecked={field.value}
                >
                  Fire Extinguisher functional?
                </Checkbox>
              )}
            />
          ),
          [isLoading, props]
        ),
      LicensePlate: ({ isLoading, ...props }: IFormProps<ICheckbox>) =>
        React.useMemo(
          () => (
            <Controller
              control={control}
              name="functionChecks.licensePlate"
              render={({ field }) => (
                <Checkbox
                  {...props}
                  {...field}
                  isDisabled={isLoading}
                  isChecked={field.value}
                >
                  License plate valid?
                </Checkbox>
              )}
            />
          ),
          [isLoading, props]
        ),
    },
  };

  return { ...form, wasDamageObserved, FormComponents };
};
