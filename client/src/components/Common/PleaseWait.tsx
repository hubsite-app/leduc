import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

const PleaseWait = () => {
  return (
    <Alert status="warning">
      <AlertIcon />
      <AlertTitle>Please Wait</AlertTitle>
      <AlertDescription>
        This may take a minute, please do not refresh.
      </AlertDescription>
    </Alert>
  );
};

export default PleaseWait;
