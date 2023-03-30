import { Button, Flex, IconButton, useToast } from "@chakra-ui/react";
import React from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import {
  SystemDocument,
  SystemSnippetFragment,
  useSystemUpdateFluidTypesMutation,
} from "../../../generated/graphql";
import FormContainer from "../../Common/FormContainer";
import SubmitButton from "../../Common/forms/SubmitButton";
import TextField from "../../Common/forms/TextField";

interface ISystemFluidTypesUpdate {
  system: SystemSnippetFragment;
  onSuccess?: () => void;
}

const SystemFluidTypesUpdate = ({
  system,
  onSuccess,
}: ISystemFluidTypesUpdate) => {
  /**
   * ----- Hook Initialization -----
   */

  const toast = useToast();

  const [update, { loading }] = useSystemUpdateFluidTypesMutation({
    refetchQueries: [SystemDocument],
  });

  const [fluidTypes, setFluidTypes] = React.useState<string[]>(
    system.fluidTypes
  );

  /**
   * ----- Variables -----
   */

  const fluidTypesCopy: string[] = React.useMemo(() => {
    return JSON.parse(JSON.stringify(fluidTypes));
  }, [fluidTypes]);

  /**
   * ----- Functions -----
   */

  const setFluidType = React.useCallback(
    (value: string, index: number) => {
      fluidTypesCopy[index] = value;

      setFluidTypes(fluidTypesCopy);
    },
    [fluidTypesCopy]
  );

  const addFluidType = React.useCallback(() => {
    fluidTypesCopy.push("");

    setFluidTypes(fluidTypesCopy);
  }, [fluidTypesCopy]);

  const removeFluidType = React.useCallback(
    (index: number) => {
      fluidTypesCopy.splice(index, 1);

      setFluidTypes(fluidTypesCopy);
    },
    [fluidTypesCopy]
  );

  const handleSubmit = React.useCallback(async () => {
    try {
      const res = await update({
        variables: {
          data: fluidTypes,
        },
      });

      if (res.data?.systemUpdateFluidTypes) {
        if (onSuccess) onSuccess();
      } else {
        toast({
          status: "error",
          title: "Error",
          description: "Something went wrong, please try again",
          isClosable: true,
        });
      }
    } catch (e: any) {
      toast({
        status: "error",
        title: "Error",
        description: e.message,
        isClosable: true,
      });
    }
  }, [onSuccess, toast, fluidTypes, update]);

  /**
   * ----- Rendering -----
   */

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {fluidTypes.map((unit, index) => (
        <FormContainer
          key={index}
          justifyContent="space-between"
          display="flex"
          flexDir="row"
        >
          <TextField
            isDisabled={loading}
            label="Type"
            isRequired
            value={unit}
            onChange={(e) => setFluidType(e.target.value, index)}
          />
          <IconButton
            isLoading={loading}
            m="auto"
            aria-label="remove"
            icon={<FiTrash />}
            backgroundColor="transparent"
            onClick={() => removeFluidType(index)}
          />
        </FormContainer>
      ))}
      <Flex justifyContent="end">
        <Button
          mt={2}
          mr={2}
          isLoading={loading}
          leftIcon={<FiPlus />}
          onClick={addFluidType}
        >
          New
        </Button>
      </Flex>
      <SubmitButton isLoading={loading} />
    </form>
  );
};

export default SystemFluidTypesUpdate;
