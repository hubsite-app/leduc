import { Box, Center, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FiTrash } from "react-icons/fi";
import {
  FileFullSnippetFragment,
  FilePreloadSnippetFragment,
  useFileFullQuery,
} from "../../generated/graphql";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import { AiOutlineFilePdf } from "react-icons/ai";

interface IFileDisplay {
  file: FilePreloadSnippetFragment;
  removeLoading?: boolean;
  onRemove?: (file: FileFullSnippetFragment) => void;
}

const FileDisplay = ({
  file: propsFile,
  onRemove,
  removeLoading,
}: IFileDisplay) => {
  /**
   * ----- Hook Initialization -----
   */

  const { data, loading } = useFileFullQuery({
    variables: {
      id: propsFile._id,
    },
  });

  /**
   * ----- Rendering -----
   */

  const display = React.useMemo(() => {
    if (data?.file && !loading) {
      const { file } = data;

      switch (file.mimetype) {
        case "image/jpeg":
        case "image/png":
        case "image/gif": {
          // eslint-disable-next-line @next/next/no-img-element
          return <img src={file.buffer} alt="image" />;
        }
        case "application/pdf": {
          return (
            <Link passHref href={file.downloadUrl}>
              <Center cursor="pointer">
                <Icon boxSize={12} as={AiOutlineFilePdf} />
              </Center>
            </Link>
          );
        }
        default: {
          return (
            <ErrorMessage
              description={`unsupported file type: ${file.mimetype}`}
            />
          );
        }
      }
    } else {
      return <Loading />;
    }
  }, [data, loading]);

  return (
    <Box>
      {display}
      <Flex flexDir="row" justifyContent="space-between">
        <Text my="auto">{propsFile.description}</Text>
        {onRemove && data?.file && (
          <IconButton
            isLoading={removeLoading}
            aria-label="remove-file"
            icon={<FiTrash />}
            backgroundColor="transparent"
            onClick={() =>
              window.confirm("Are you sure?") && onRemove(data.file)
            }
          />
        )}
      </Flex>
    </Box>
  );
};

export default FileDisplay;
