import { Code, Flex, IconButton, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { FiCheck, FiEdit2 } from "react-icons/fi";
import {
  SystemDocument,
  SystemSnippetFragment,
  useSystemUpdateInternalExpenseOverheadRateMutation,
} from "../../../generated/graphql";
import NumberForm from "../forms/Number";
import SubmitButton from "../forms/SubmitButton";

interface ISystemInternalExpenseOverheadRate {
  system: SystemSnippetFragment;
}

const SystemInternalExpenseOverheadRate = ({
  system,
}: ISystemInternalExpenseOverheadRate) => {
  /**
   * ----- Hook Initialization -----
   */

  const toast = useToast();

  const [edit, setEdit] = React.useState(false);

  const [value, setValue] = React.useState(system.internalExpenseOverheadRate);

  const [update, { loading }] =
    useSystemUpdateInternalExpenseOverheadRateMutation({
      refetchQueries: [SystemDocument],
    });

  /**
   * ----- Functions -----
   */

  const handleSubmit = React.useCallback(async () => {
    try {
      const res = await update({ variables: { value } });

      if (res.data?.systemUpdateInternalExpenseOverheadRate) {
        setEdit(false);
        setValue(
          res.data.systemUpdateInternalExpenseOverheadRate
            .internalExpenseOverheadRate
        );
      } else {
        toast({
          status: "error",
          title: "Error",
          description: "Something went wrong, please try again",
          isClosable: true,
        });
      }
    } catch (error) {}
  }, [toast, update, value]);

  /**
   * ----- Rendering -----
   */

  return (
    <Flex flexDir="row">
      <Flex flexDir="row">
        <IconButton
          size="sm"
          icon={<FiEdit2 />}
          aria-label="edit"
          backgroundColor="transparent"
          onClick={() => setEdit(!edit)}
          _hover={{ backgroundColor: "transparent" }}
          _focus={{ border: "none" }}
          _active={{ backgroundColor: "transparent" }}
        />
        <Text m="auto" fontWeight="bold">
          Internal Expense Overhead:
        </Text>
      </Flex>
      {edit ? (
        <form
          style={{
            display: "flex",
            flexDirection: "row",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <NumberForm
            value={value}
            onChange={(_, number) => setValue(number)}
            isDisabled={loading}
          />
          <IconButton
            aria-label="submit"
            type="submit"
            icon={<FiCheck />}
            backgroundColor="transparent"
          />
        </form>
      ) : (
        <Code backgroundColor="transparent" my="auto" mx={2} fontSize="lg">
          {system.internalExpenseOverheadRate}%
        </Code>
      )}
    </Flex>
  );
};

export default SystemInternalExpenseOverheadRate;
