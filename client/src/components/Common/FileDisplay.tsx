import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { FiTrash } from "react-icons/fi";
import { FileFullSnippetFragment } from "../../generated/graphql";
import ErrorMessage from "./ErrorMessage";

interface IFileDisplay {
  file: FileFullSnippetFragment;
  removeLoading?: boolean;
  onRemove?: (file: FileFullSnippetFragment) => void;
}

const FileDisplay = ({ file, onRemove, removeLoading }: IFileDisplay) => {
  const display = React.useMemo(() => {
    switch (file.mimetype) {
      case "image/jpeg":
      case "image/png":
      case "image/gif": {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={file.buffer} alt="image" />;
      }
      default: {
        return (
          <ErrorMessage
            description={`unsupported file type: ${file.mimetype}`}
          />
        );
      }
    }
  }, [file]);

  return (
    <Box>
      {display}
      <Flex flexDir="row" justifyContent="space-between">
        <Text whiteSpace="pre-wrap">{file.description}</Text>
        {onRemove && (
          <IconButton
            isLoading={removeLoading}
            aria-label="remove-file"
            icon={<FiTrash />}
            backgroundColor="transparent"
            onClick={() => window.confirm("Are you sure?") && onRemove(file)}
          />
        )}
      </Flex>
    </Box>
  );
};

export default FileDisplay;
