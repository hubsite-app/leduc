import { Flex, Heading, IconButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { FiTrash } from "react-icons/fi";

import {
  MaterialsFullDocument,
  useMaterialRemoveMutation,
  useMaterialsFullQuery,
} from "../../../generated/graphql";
import Card from "../Card";
import InfiniteScroll from "../InfiniteScroll";
import Loading from "../Loading";

const MaterialFullList = () => {
  /**
   * ----- Hook Initialization -----
   */

  const { data, loading, fetchMore, networkStatus } = useMaterialsFullQuery({
    notifyOnNetworkStatusChange: true,
  });

  const [remove, { loading: removeLoading }] = useMaterialRemoveMutation({
    refetchQueries: [MaterialsFullDocument],
  });

  const [finished, setFinished] = React.useState(false);

  /**
   * ----- Functions -----
   */

  const nextPage = React.useCallback(() => {
    if (!finished && networkStatus === 7) {
      fetchMore({
        variables: {
          options: {
            offset: data?.materials.length,
          },
        },
      }).then((data) => {
        if (data.data.materials.length === 0) setFinished(true);
      });
    }
  }, [data?.materials.length, fetchMore, finished, networkStatus]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (data?.materials) {
      return (
        <Flex flexDir="column" alignContent="center">
          {data.materials.map((material) => (
            <Card key={material._id}>
              <Flex flexDir="row" justifyContent="space-between">
                <Heading size="md">{material.name}</Heading>
                {material.canRemove && (
                  <Tooltip label="This material can be removed as it is not referenced by an existing Jobsite Material. It is still recommended that these are not deleted.">
                    <IconButton
                      aria-label="delete"
                      icon={<FiTrash />}
                      backgroundColor="transparent"
                      isLoading={removeLoading}
                      onClick={() => {
                        if (window.confirm("Are you sure?"))
                          remove({
                            variables: {
                              id: material._id,
                            },
                          });
                      }}
                    />
                  </Tooltip>
                )}
              </Flex>
            </Card>
          ))}
          {loading && <Loading />}
        </Flex>
      );
    } else {
      return <Loading />;
    }
  }, [data?.materials, loading, remove, removeLoading]);

  return (
    <InfiniteScroll
      enabled={!!data?.materials && data.materials.length > 0}
      loading={networkStatus !== 7}
      content={content}
      nextPage={nextPage}
    />
  );
};

export default MaterialFullList;
