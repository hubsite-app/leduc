import React from "react";

import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
  UseFormProps,
} from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { IFormProps } from "../typescript/forms";
import TextField, { ITextField } from "../components/Common/forms/TextField";
import NumberForm, { INumber } from "../components/Common/forms/Number";
import Checkbox, { ICheckbox } from "../components/Common/forms/Checkbox";
import { Box, Button, Flex, Icon, IconButton } from "@chakra-ui/react";
import { FiPlus, FiX } from "react-icons/fi";
import {
  EquipmentUsageUnits,
  OperatorDailyReportCreateData,
} from "../generated/graphql";
import FluidTypeSelect from "../components/Common/forms/FluidSelect";

const OperatorDailyReportSchema = yup.object().shape({
  startTime: yup.string().required("Please provide a start time"),
  equipmentUsage: yup.object().shape({
    usage: yup.number().required("Please provide vehicle usage"),
    unit: yup.string().required("Please provide usage units"),
  }),
  checklist: yup.object().shape({
    walkaroundComplete: yup.boolean().default(false).required(),
    visualInspectionComplete: yup.boolean().default(false).required(),
    oilChecked: yup.boolean().default(false).required(),
    coolantChecked: yup.boolean().default(false).required(),
    fluidsChecked: yup.boolean().default(false).required(),
  }),
  functionChecks: yup.object().shape({
    backupAlarm: yup.boolean().default(false).required(),
    lights: yup.boolean().default(false).required(),
    fireExtinguisher: yup.boolean().default(false).required(),
    licensePlate: yup.boolean().default(false).required(),
  }),
  malfunction: yup.boolean().default(false),
  damageObserved: yup.boolean().default(false),
  leaks: yup.array().of(
    yup.object().shape({
      type: yup.string().required("Please provide the type of leak"),
      location: yup
        .string()
        .required("Please provide the location of the leak"),
    })
  ),
  fluidsAdded: yup.array().of(
    yup.object().shape({
      type: yup.string().required("Please provide the type of fluid added"),
      amount: yup
        .number()
        .typeError("Please provide the amount of fluid added")
        .required("Please provide the amount of fluid added"),
    })
  ),
});

export const useOperatorDailyReportForm = (options?: UseFormProps) => {
  /**
   * ----- Hook Initialization -----
   */

  const form = useForm({
    resolver: yupResolver(OperatorDailyReportSchema),
    defaultValues: {
      equipmentUsage: {
        unit: EquipmentUsageUnits.Km,
      },
      startTime: new Date().toISOString(),
      leaks: [],
      fluidsAdded: [],
      ...options?.defaultValues,
    },
    ...options,
  });

  /**
   * ----- Variables -----
   */

  const { handleSubmit, control, watch, setValue } = form;

  const equipmentUsageUnit = watch("equipmentUsage.unit");

  const {
    fields: leaksFoundFields,
    append: appendLeakFound,
    remove: removeLeakFound,
  } = useFieldArray({
    control,
    name: "leaks",
  });

  const {
    fields: fluidAddedFields,
    append: appendFluidAdded,
    remove: removeFluidAdded,
  } = useFieldArray({
    control,
    name: "fluidsAdded",
  });

  const equipmentUsageUnitLabel = React.useMemo(() => {
    switch (equipmentUsageUnit) {
      case EquipmentUsageUnits.Km:
        return "KM";
      case EquipmentUsageUnits.Hours:
        return "HOURS";
      default:
        return "ERROR";
    }
  }, [equipmentUsageUnit]);

  /**
   * ----- Functions -----
   */

  const toggleEquipmentUsageUnit = React.useCallback(() => {
    switch (equipmentUsageUnit) {
      case EquipmentUsageUnits.Km:
        setValue("equipmentUsage.unit", EquipmentUsageUnits.Hours);
        break;
      case EquipmentUsageUnits.Hours:
        setValue("equipmentUsage.unit", EquipmentUsageUnits.Km);
        break;
      default:
        break;
    }
  }, [equipmentUsageUnit, setValue]);

  const getDateForTime = React.useCallback((timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const newDate = new Date();
    newDate.setHours(Number(hours));
    newDate.setMinutes(Number(minutes));
    return newDate;
  }, []);

  /*
   * ----- Components -----
   */

  const FormComponents = {
    Form: ({
      children,
      submitHandler,
    }: {
      children: React.ReactNode;
      submitHandler: SubmitHandler<OperatorDailyReportCreateData>;
    }) => <form onSubmit={handleSubmit(submitHandler)}>{children}</form>,
    EquipmentUsage: ({ isLoading, ...props }: IFormProps<INumber>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="equipmentUsage.usage"
            render={({ field, fieldState }) => (
              <NumberForm
                {...props}
                {...field}
                errorMessage={fieldState.error?.message}
                label="Usage"
                onChange={(_, num) => field.onChange(num)}
                isDisabled={isLoading || props.isDisabled}
                inputRightElement={
                  <Button
                    onClick={() => toggleEquipmentUsageUnit()}
                    px={6}
                    mr={4}
                    size="sm"
                    isLoading={isLoading}
                    isDisabled={props.isDisabled}
                  >
                    {equipmentUsageUnitLabel}
                  </Button>
                }
                inputRightElementProps={{ w: "7.5rem" }}
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
                isDisabled={isLoading || props.isDisabled}
                onChange={(e) => {
                  if (e.target.value)
                    field.onChange(
                      getDateForTime(e.target.value).toISOString()
                    );
                }}
              />
            )}
          />
        ),
        [isLoading, props]
      ),
    Checklist: {
      Walkaround: ({ isLoading, ...props }: IFormProps<ICheckbox>) =>
        React.useMemo(
          () => (
            <Controller
              control={control}
              name="checklist.walkaroundComplete"
              render={({ field }) => (
                <Checkbox
                  {...props}
                  {...field}
                  isChecked={field.value}
                  isDisabled={isLoading || props.isDisabled}
                >
                  Walk-around Complete
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
                  isDisabled={isLoading || props.isDisabled}
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
                  isDisabled={isLoading || props.isDisabled}
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
                  isDisabled={isLoading || props.isDisabled}
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
                  isDisabled={isLoading || props.isDisabled}
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
    Malfunction: ({ isLoading, ...props }: IFormProps<ICheckbox>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="malfunction"
            render={({ field }) => (
              <Checkbox
                {...props}
                {...field}
                isDisabled={isLoading || props.isDisabled}
                isChecked={field.value}
              >
                Machine Malfunction
              </Checkbox>
            )}
          />
        ),
        [isLoading, props]
      ),
    DamageObserved: ({ isLoading, ...props }: IFormProps<ICheckbox>) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="damageObserved"
            render={({ field }) => (
              <Checkbox
                {...props}
                {...field}
                isDisabled={isLoading || props.isDisabled}
                isChecked={field.value}
              >
                Damage observed?
              </Checkbox>
            )}
          />
        ),
        [isLoading, props]
      ),
    Leaks: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(() => {
        return (
          <Box m={2}>
            {leaksFoundFields.map((_, index) => (
              <Box
                key={index}
                backgroundColor="gray.300"
                m={2}
                borderRadius={4}
                p={2}
              >
                <Flex flexDir="row" w="100%">
                  <Box w="100%">
                    <Controller
                      control={control}
                      name={`leaks.${index}.type`}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...props}
                          {...field}
                          errorMessage={fieldState.error?.message}
                          label="Fluid Type"
                          isDisabled={isLoading || props.isDisabled}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`leaks.${index}.location`}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...props}
                          {...field}
                          errorMessage={fieldState.error?.message}
                          label="Leak Location"
                          isDisabled={isLoading || props.isDisabled}
                        />
                      )}
                    />
                  </Box>
                  <IconButton
                    onClick={() => removeLeakFound(index)}
                    aria-label="remove-leak"
                    icon={<FiX />}
                    backgroundColor="transparent"
                    isDisabled={isLoading || props.isDisabled}
                  />
                </Flex>
              </Box>
            ))}
            <Button
              onClick={() => appendLeakFound({ type: "", location: "" })}
              w="100%"
              backgroundColor="white"
              isDisabled={isLoading || props.isDisabled}
              _hover={{ backgroundColor: "gray.300" }}
            >
              Leak Found
              <Icon as={FiPlus} />
            </Button>
          </Box>
        );
      }, [isLoading, props]),
    FluidsAdded: ({ isLoading, ...props }: IFormProps<ITextField>) =>
      React.useMemo(() => {
        return (
          <Box m={2}>
            {fluidAddedFields.map((_, index) => (
              <Box
                key={index}
                backgroundColor="gray.300"
                m={2}
                borderRadius={4}
                p={2}
              >
                <Flex flexDir="row" w="100%">
                  <Box w="100%">
                    <Controller
                      control={control}
                      name={`fluidsAdded.${index}.type`}
                      rules={{ required: "Must provide fluid type" }}
                      render={({ field, fieldState }) => (
                        <FluidTypeSelect
                          {...field}
                          errorMessage={fieldState.error?.message}
                          label="Fluid type"
                          isDisabled={isLoading || props.isDisabled}
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
                          isDisabled={isLoading || props.isDisabled}
                          inputRightAddon="L"
                          onChange={(_, num) => field.onChange(num)}
                        />
                      )}
                    />
                  </Box>
                  <IconButton
                    onClick={() => removeFluidAdded(index)}
                    aria-label="remove-fluid"
                    icon={<FiX />}
                    backgroundColor="transparent"
                    isDisabled={isLoading || props.isDisabled}
                  />
                </Flex>
              </Box>
            ))}
            <Button
              onClick={() => appendFluidAdded({ type: "", amount: null })}
              w="100%"
              backgroundColor="white"
              isDisabled={isLoading || props.isDisabled}
              _hover={{ backgroundColor: "gray.300" }}
            >
              Add Fluid
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
                  isDisabled={isLoading || props.isDisabled}
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
                  isDisabled={isLoading || props.isDisabled}
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
                  isDisabled={isLoading || props.isDisabled}
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
                  isDisabled={isLoading || props.isDisabled}
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

  return { ...form, FormComponents };
};
