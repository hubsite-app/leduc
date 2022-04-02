import { Box, Flex, IconButton, SimpleGrid, useToast } from "@chakra-ui/react";
import React from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { MaterialShipmentVehicleTypes } from "../../../constants/select";
import {
  DailyReportFullDocument,
  DailyReportFullSnippetFragment,
  MaterialShipmentCreateData,
  MaterialShipmentShipmentData,
  MaterialShipmentVehicleObjectData,
  useMaterialShipmentCreateMutation,
} from "../../../generated/graphql";
import convertHourToDate from "../../../utils/convertHourToDate";
import isEmpty from "../../../utils/isEmpty";
import ContactOffice from "../../Common/ContactOffice";
import ErrorMessage from "../../Common/ErrorMessage";
import Number from "../../Common/forms/Number";
import Select, { ISelect } from "../../Common/forms/Select";
import SubmitButton from "../../Common/forms/SubmitButton";
import TextField from "../../Common/forms/TextField";
import Unit from "../../Common/forms/Unit";
import CompanySearch from "../../Search/CompanySearch";
import MaterialSearch from "../../Search/MaterialSearch";

type ShipmentErrors = {
  jobsiteMaterialId?: string;
  shipmentType?: string;
  supplier?: string;
  unit?: string;
  quantity?: string;
  startTime?: string;
  endTime?: string;
};

type FormErrors = {
  shipments: ShipmentErrors[];
  vehicleObject: {
    source?: string;
    vehicleCode?: string;
    vehicleType?: string;
  };
}[];

interface IMaterialShipmentCreate {
  dailyReport: DailyReportFullSnippetFragment;
  onSuccess?: () => void;
}

const MaterialShipmentCreate = ({
  dailyReport,
  onSuccess,
}: IMaterialShipmentCreate) => {
  const initialShipment: MaterialShipmentShipmentData = React.useMemo(() => {
    const jobsiteMaterialId = dailyReport.jobsite.materials[0]?._id || "";

    return {
      noJobsiteMaterial: isEmpty(jobsiteMaterialId),
      jobsiteMaterialId,
      quantity: 0,
      startTime: undefined,
      endTime: undefined,
    };
  }, [dailyReport.jobsite.materials]);

  const initialVehicleObject: MaterialShipmentVehicleObjectData =
    React.useMemo(() => {
      return {
        source: "",
        vehicleType:
          dailyReport.jobsite.truckingRates[0]?.title ||
          MaterialShipmentVehicleTypes[0],
        vehicleCode: "",
        truckingRateId: dailyReport.jobsite.truckingRates[0]?._id || "",
      };
    }, [dailyReport.jobsite.truckingRates]);

  /**
   * ----- Hook Initialization -----
   */

  const toast = useToast();

  const [formData, setFormData] = React.useState<MaterialShipmentCreateData[]>([
    {
      vehicleObject: initialVehicleObject,
      shipments: [initialShipment],
    },
  ]);

  const [generalError, setGeneralError] = React.useState<string>();

  const [formErrors, setFormErrors] = React.useState<FormErrors>([]);

  const [hasTriedSubmit, setHasTriedSubmit] = React.useState(false);

  const [create, { loading }] = useMaterialShipmentCreateMutation({
    refetchQueries: [DailyReportFullDocument],
  });

  /**
   * ----- Variables -----
   */

  const vehicleTypeOptions: ISelect["options"] = React.useMemo(() => {
    return dailyReport.jobsite.truckingRates.map((rate) => {
      return {
        title: rate.title,
        value: rate._id!,
      };
    });
  }, [dailyReport.jobsite.truckingRates]);

  /**
   * ----- Functions -----
   */

  const updateJobsiteMaterial = React.useCallback(
    (jobsiteMaterialId: string, dataIndex: number, shipmentIndex: number) => {
      const formDataCopy: MaterialShipmentCreateData[] = JSON.parse(
        JSON.stringify(formData)
      );

      if (isEmpty(jobsiteMaterialId))
        formDataCopy[dataIndex].shipments[shipmentIndex].noJobsiteMaterial =
          true;
      else
        formDataCopy[dataIndex].shipments[shipmentIndex].noJobsiteMaterial =
          false;

      formDataCopy[dataIndex].shipments[shipmentIndex].jobsiteMaterialId =
        jobsiteMaterialId;

      setFormData(formDataCopy);
    },
    [formData]
  );

  const updateQuantity = React.useCallback(
    (value: number, dataIndex: number, shipmentIndex: number) => {
      const formDataCopy: MaterialShipmentCreateData[] = JSON.parse(
        JSON.stringify(formData)
      );

      formDataCopy[dataIndex].shipments[shipmentIndex].quantity = value;

      setFormData(formDataCopy);
    },
    [formData]
  );

  const updateUnit = React.useCallback(
    (value: string, dataIndex: number, shipmentIndex: number) => {
      const formDataCopy: MaterialShipmentCreateData[] = JSON.parse(
        JSON.stringify(formData)
      );

      formDataCopy[dataIndex].shipments[shipmentIndex].unit = value;

      setFormData(formDataCopy);
    },
    [formData]
  );

  const updateShipmentType = React.useCallback(
    (value: string, dataIndex: number, shipmentIndex: number) => {
      const formDataCopy: MaterialShipmentCreateData[] = JSON.parse(
        JSON.stringify(formData)
      );

      formDataCopy[dataIndex].shipments[shipmentIndex].shipmentType = value;

      setFormData(formDataCopy);
    },
    [formData]
  );

  const updateSupplier = React.useCallback(
    (value: string, dataIndex: number, shipmentIndex: number) => {
      const formDataCopy: MaterialShipmentCreateData[] = JSON.parse(
        JSON.stringify(formData)
      );

      formDataCopy[dataIndex].shipments[shipmentIndex].supplier = value;

      setFormData(formDataCopy);
    },
    [formData]
  );

  const updateStartTime = React.useCallback(
    (value: string, dataIndex: number, shipmentIndex: number) => {
      const formDataCopy: MaterialShipmentCreateData[] = JSON.parse(
        JSON.stringify(formData)
      );

      formDataCopy[dataIndex].shipments[shipmentIndex].startTime =
        convertHourToDate(value, dailyReport.date);

      setFormData(formDataCopy);
    },
    [dailyReport.date, formData]
  );

  const updateEndTime = React.useCallback(
    (value: string, dataIndex: number, shipmentIndex: number) => {
      const formDataCopy: MaterialShipmentCreateData[] = JSON.parse(
        JSON.stringify(formData)
      );

      formDataCopy[dataIndex].shipments[shipmentIndex].endTime =
        convertHourToDate(value, dailyReport.date);

      setFormData(formDataCopy);
    },
    [dailyReport.date, formData]
  );

  const updateVehicleSource = React.useCallback(
    (value: string, dataIndex: number) => {
      const formDataCopy: MaterialShipmentCreateData[] = JSON.parse(
        JSON.stringify(formData)
      );

      formDataCopy[dataIndex].vehicleObject.source = value;

      setFormData(formDataCopy);
    },
    [formData]
  );

  const updateVehicleCode = React.useCallback(
    (value: string, dataIndex: number) => {
      const formDataCopy: MaterialShipmentCreateData[] = JSON.parse(
        JSON.stringify(formData)
      );

      formDataCopy[dataIndex].vehicleObject.vehicleCode = value;

      setFormData(formDataCopy);
    },
    [formData]
  );

  const updateVehicleType = React.useCallback(
    (type: string, truckingRateId: string, dataIndex: number) => {
      const formDataCopy: MaterialShipmentCreateData[] = JSON.parse(
        JSON.stringify(formData)
      );

      formDataCopy[dataIndex].vehicleObject.vehicleType = type;
      formDataCopy[dataIndex].vehicleObject.truckingRateId = truckingRateId;

      setFormData(formDataCopy);
    },
    [formData]
  );

  const addShipment = React.useCallback(
    (dataIndex: number) => {
      setHasTriedSubmit(false);

      const formDataCopy: MaterialShipmentCreateData[] = JSON.parse(
        JSON.stringify(formData)
      );

      formDataCopy[dataIndex].shipments.push(initialShipment);

      setFormData(formDataCopy);
    },
    [formData, initialShipment]
  );

  const removeShipment = React.useCallback(
    (dataIndex: number, shipmentIndex: number) => {
      const formDataCopy: MaterialShipmentCreateData[] = JSON.parse(
        JSON.stringify(formData)
      );

      formDataCopy[dataIndex].shipments.splice(shipmentIndex, 1);

      setFormData(formDataCopy);
    },
    [formData]
  );

  const addData = React.useCallback(() => {
    setHasTriedSubmit(false);
    const formDataCopy: MaterialShipmentCreateData[] = JSON.parse(
      JSON.stringify(formData)
    );

    formDataCopy.push({
      vehicleObject: initialVehicleObject,
      shipments: [initialShipment],
    });

    setFormData(formDataCopy);
  }, [formData, initialShipment, initialVehicleObject]);

  const removeData = React.useCallback(
    (dataIndex: number) => {
      const formDataCopy: MaterialShipmentCreateData[] = JSON.parse(
        JSON.stringify(formData)
      );

      formDataCopy.splice(dataIndex, 1);

      setFormData(formDataCopy);
    },
    [formData]
  );

  const checkErrors = React.useCallback(() => {
    const formErrors: FormErrors = [];
    let valid = true;

    for (let i = 0; i < formData.length; i++) {
      let shipments: ShipmentErrors[] = [],
        vehicleObject: FormErrors[0]["vehicleObject"] = {
          source: undefined,
          vehicleCode: undefined,
          vehicleType: undefined,
        };

      for (let j = 0; j < formData[i].shipments.length; j++) {
        shipments[j] = {
          jobsiteMaterialId: undefined,
          quantity: undefined,
          startTime: undefined,
          endTime: undefined,
          shipmentType: undefined,
          supplier: undefined,
          unit: undefined,
        };

        if (isEmpty(formData[i].shipments[j].quantity)) {
          shipments[j].quantity = "please provide a quantity";
          valid = false;
        }

        if (formData[i].shipments[j].noJobsiteMaterial) {
          if (isEmpty(formData[i].shipments[j].shipmentType)) {
            shipments[j].shipmentType = "please provide a shipment type";
            valid = false;
          }

          if (isEmpty(formData[i].shipments[j].supplier)) {
            shipments[j].supplier = "please provide a supplier";
            valid = false;
          }

          if (isEmpty(formData[i].shipments[j].unit)) {
            shipments[j].unit = "please provide a unit";
            valid = false;
          }
        }
      }

      if (isEmpty(formData[i].vehicleObject.source)) {
        vehicleObject.source = "please provide a vehicle source";
        valid = false;
      }

      if (isEmpty(formData[i].vehicleObject.vehicleCode)) {
        vehicleObject.vehicleCode = "please provide a vehicle code";
        valid = false;
      }

      if (isEmpty(formData[i].vehicleObject.vehicleType)) {
        vehicleObject.vehicleType = "please provide a vehicle type";
        valid = false;
      }

      if (isEmpty(formData[i].vehicleObject.truckingRateId)) {
        vehicleObject.vehicleType =
          "something went wrong, please contact support";
        valid = false;
      }

      formErrors[i] = {
        shipments,
        vehicleObject,
      };
    }

    setFormErrors(formErrors);

    return valid;
  }, [formData]);

  const trySubmit = React.useCallback(() => {
    setHasTriedSubmit(true);

    if (checkErrors()) {
      create({
        variables: {
          dailyReportId: dailyReport._id,
          data: formData,
        },
      })
        .then(() => {
          toast({
            isClosable: true,
            description: "Successfully added material shipments",
            title: "Success",
            status: "success",
          });
          setGeneralError(undefined);
          if (onSuccess) onSuccess();
        })
        .catch((err) => {
          setGeneralError(err.message);
        });
    }
  }, [checkErrors, onSuccess, create, dailyReport._id, formData, toast]);

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (hasTriedSubmit) checkErrors();
  }, [formData, hasTriedSubmit, checkErrors]);

  /**
   * ----- Rendering -----
   */

  return (
    <Box>
      {generalError && <ErrorMessage description={generalError} />}
      {formData.map((data, dataIndex) => (
        <Box
          key={dataIndex}
          backgroundColor="gray.200"
          borderRadius={4}
          p={2}
          m={2}
        >
          {formData.length > 1 && (
            <Flex justifyContent="end">
              <IconButton
                p={0}
                icon={<FiX />}
                aria-label="remove"
                onClick={() => removeData(dataIndex)}
                backgroundColor="transparent"
                isLoading={loading}
              />
            </Flex>
          )}
          {/* SHIPMENTS */}
          {data.shipments.map((shipment, shipmentIndex) => (
            <Box
              key={`${dataIndex}-${shipmentIndex}`}
              backgroundColor="gray.300"
              borderRadius={4}
              p={2}
              m={2}
            >
              {data.shipments.length > 1 && (
                <Flex justifyContent="end">
                  <IconButton
                    p={0}
                    icon={<FiX />}
                    aria-label="remove"
                    onClick={() => removeShipment(dataIndex, shipmentIndex)}
                    backgroundColor="transparent"
                    isLoading={loading}
                  />
                </Flex>
              )}
              {/* SHIPMENT */}
              {shipment.noJobsiteMaterial ? (
                // NO JOBSITE MATERIAL
                <>
                  <Select
                    name="jobsiteMaterialId"
                    options={dailyReport.jobsite.materials.map(
                      (jobsiteMaterial) => {
                        return {
                          title: `${jobsiteMaterial.material.name} - ${jobsiteMaterial.supplier.name}`,
                          value: jobsiteMaterial._id,
                        };
                      }
                    )}
                    placeholder="Material not listed"
                    label="Material"
                    isDisabled={loading}
                    value={shipment.jobsiteMaterialId || undefined}
                    errorMessage={
                      formErrors[dataIndex]?.shipments[shipmentIndex]
                        ?.jobsiteMaterialId
                    }
                    onChange={(e) => {
                      updateJobsiteMaterial(
                        e.target.value,
                        dataIndex,
                        shipmentIndex
                      );
                    }}
                  />
                  <SimpleGrid spacing={2} columns={[1, 1, 2]}>
                    <Number
                      step={10}
                      stepper
                      label="Quantity"
                      isDisabled={loading}
                      value={shipment.quantity}
                      errorMessage={
                        formErrors[dataIndex]?.shipments[shipmentIndex]
                          ?.quantity
                      }
                      onChange={(e) =>
                        updateQuantity(parseInt(e), dataIndex, shipmentIndex)
                      }
                    />
                    <Unit
                      label="Units"
                      value={shipment.unit || undefined}
                      onChange={(e) =>
                        updateUnit(e.target.value, dataIndex, shipmentIndex)
                      }
                      errorMessage={
                        formErrors[dataIndex]?.shipments[shipmentIndex]?.unit
                      }
                    />
                  </SimpleGrid>
                  <SimpleGrid spacing={2} columns={[1, 1, 2]}>
                    <MaterialSearch
                      label="Received Material"
                      isDisabled={loading}
                      errorMessage={
                        formErrors[dataIndex]?.shipments[shipmentIndex]
                          ?.shipmentType
                      }
                      materialSelected={(material) =>
                        updateShipmentType(
                          material.name,
                          dataIndex,
                          shipmentIndex
                        )
                      }
                    />
                    <CompanySearch
                      label="Supplier"
                      isDisabled={loading}
                      errorMessage={
                        formErrors[dataIndex]?.shipments[shipmentIndex]
                          ?.supplier
                      }
                      companySelected={(company) =>
                        updateSupplier(company.name, dataIndex, shipmentIndex)
                      }
                    />
                  </SimpleGrid>
                </>
              ) : (
                // JOBSITE MATERIAL
                <SimpleGrid spacing={2} columns={[1, 1, 2]}>
                  <Select
                    name="jobsiteMaterialId"
                    options={dailyReport.jobsite.materials.map(
                      (jobsiteMaterial) => {
                        return {
                          title: `${jobsiteMaterial.material.name} - ${jobsiteMaterial.supplier.name}`,
                          value: jobsiteMaterial._id,
                        };
                      }
                    )}
                    placeholder="Material not listed"
                    label="Material"
                    isDisabled={loading}
                    value={shipment.jobsiteMaterialId || undefined}
                    errorMessage={
                      formErrors[dataIndex]?.shipments[shipmentIndex]
                        ?.jobsiteMaterialId
                    }
                    onChange={(e) => {
                      updateJobsiteMaterial(
                        e.target.value,
                        dataIndex,
                        shipmentIndex
                      );
                    }}
                  />
                  <Number
                    step={10}
                    stepper
                    label="Quantity"
                    isDisabled={loading}
                    value={shipment.quantity}
                    errorMessage={
                      formErrors[dataIndex]?.shipments[shipmentIndex]?.quantity
                    }
                    onChange={(e) =>
                      updateQuantity(parseInt(e), dataIndex, shipmentIndex)
                    }
                  />
                </SimpleGrid>
              )}

              <SimpleGrid spacing={2} columns={[1, 1, 2]}>
                <TextField
                  label="Start Time (optional)"
                  isDisabled={loading}
                  value={shipment.startTime}
                  bgColor="white"
                  type="time"
                  onChange={(e) =>
                    updateStartTime(e.target.value, dataIndex, shipmentIndex)
                  }
                  errorMessage={
                    formErrors[dataIndex]?.shipments[shipmentIndex]?.startTime
                  }
                />
                <TextField
                  label="End Time (optional)"
                  isDisabled={loading}
                  value={shipment.endTime}
                  bgColor="white"
                  type="time"
                  onChange={(e) =>
                    updateEndTime(e.target.value, dataIndex, shipmentIndex)
                  }
                  errorMessage={
                    formErrors[dataIndex]?.shipments[shipmentIndex]?.endTime
                  }
                />
              </SimpleGrid>
              {/* END SHIPMENT */}
            </Box>
          ))}
          <Box w="100%" px={2}>
            <IconButton
              w="100%"
              icon={<FiPlus />}
              aria-label="add-shipment"
              onClick={() => addShipment(dataIndex)}
              backgroundColor="gray.300"
              isLoading={loading}
            />
          </Box>

          {/* VEHICLE OBJECT */}
          <SimpleGrid spacing={2} columns={[1, 1, 3]} p={4}>
            <CompanySearch
              label="Vehicle Source"
              isDisabled={loading}
              errorMessage={formErrors[dataIndex]?.vehicleObject?.source}
              companySelected={(company) =>
                updateVehicleSource(company.name, dataIndex)
              }
              helperText={
                <>
                  if not available contact <ContactOffice />
                </>
              }
            />
            <Select
              name="vehicleType"
              onChange={(e) => {
                updateVehicleType(
                  e.target.options[e.target.selectedIndex].text,
                  e.target.value,
                  dataIndex
                );
              }}
              options={vehicleTypeOptions}
              errorMessage={formErrors[dataIndex]?.vehicleObject?.vehicleType}
              label="Vehicle Type"
              isDisabled={loading}
              helperText={
                <>
                  if not available contact <ContactOffice />
                </>
              }
            />
            <TextField
              label="Vehicle Code"
              isDisabled={loading}
              value={data.vehicleObject.vehicleCode}
              errorMessage={formErrors[dataIndex]?.vehicleObject?.vehicleCode}
              onChange={(e) => updateVehicleCode(e.target.value, dataIndex)}
              helperText="&nbsp;"
            />
          </SimpleGrid>
        </Box>
      ))}

      <Box w="100%" px={2}>
        <IconButton
          w="100%"
          icon={<FiPlus />}
          aria-label="add"
          backgroundColor="gray.200"
          onClick={addData}
          isLoading={loading}
        />
      </Box>

      <Box w="100%" px={2}>
        <SubmitButton onClick={trySubmit} isLoading={loading} />
      </Box>
    </Box>
  );
};

export default MaterialShipmentCreate;
