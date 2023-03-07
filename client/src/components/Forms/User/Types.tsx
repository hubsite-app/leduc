import { Flex, Icon, useToast } from "@chakra-ui/react";
import React from "react";
import {
  Exact,
  UserCardSnippetFragment,
  UserTypes,
  UserUpdateTypesMutation,
  useUserUpdateTypesMutation,
} from "../../../generated/graphql";
import { FcCheckmark } from "react-icons/fc";
import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
} from "@apollo/client";
import SelectMultiple from "../../Common/forms/SelectMultiple";

interface IUserUpdateTypes {
  user: UserCardSnippetFragment;
  mutationOptions?:
  | MutationHookOptions<
    UserUpdateTypesMutation,
    Exact<{
      id: string;
      types: UserTypes[] | UserTypes;
    }>,
    DefaultContext,
    ApolloCache<any>
  >
  | undefined;
}

const UserUpdateTypes = ({ user, mutationOptions }: IUserUpdateTypes) => {
  /**
   * ----- Hook Initialization -----
   */

  const toast = useToast({
    isClosable: true,
    status: "error",
  });

  const [update, { data, loading }] = useUserUpdateTypesMutation({
    ...mutationOptions,
  });

  /**
   * ----- Functions -----
   */

  const handleChange = React.useCallback(
    async (selections: string[]) => {
      try {
        await update({
          variables: {
            id: user._id,
            types: selections as UserTypes[],
          },
        });
      } catch (e: any) {
        toast({
          title: "Error",
          description: e.message,
        });
      }
    },
    [toast, update, user._id]
  );

  /**
   * ----- Rendering -----
   */

  return (
    <Flex flexDir="row">
      <SelectMultiple
        onSelectionChange={handleChange}
        value={user.types || []}
        options={[
          {
            label: "Operations",
            value: UserTypes.Operations,
          },
          {
            label: "Vehicle Maintenance",
            value: UserTypes.VehicleMaintenance,
          },
        ]}
      />
      {!loading && data?.userUpdateTypes && (
        <Icon boxSize={8} pl={2} m="auto" as={FcCheckmark} />
      )}
    </Flex>
  );
};

export default UserUpdateTypes;
