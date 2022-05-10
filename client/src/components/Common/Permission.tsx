import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../contexts/Auth";
import { UserRoles } from "../../generated/graphql";

interface IPermission {
  minRole?: UserRoles;
  otherCriteria?: boolean;
  showError?: boolean;
}

const Permission: React.FC<IPermission> = ({
  minRole = UserRoles.Admin,
  otherCriteria = false,
  showError = false,
  children,
}) => {
  const {
    state: { user },
  } = useAuth();

  let alternativeDisplay = null;
  if (showError === true)
    alternativeDisplay = (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          You do not have permission to view this
        </AlertDescription>
      </Alert>
    );

  // User Admin
  if (user?.role === UserRoles.Admin || otherCriteria) return <>{children}</>;
  // Project Manager
  if (user?.role === UserRoles.ProjectManager) {
    if (
      minRole === UserRoles.ProjectManager ||
      minRole === UserRoles.User ||
      otherCriteria
    )
      return <>{children}</>;
    else return alternativeDisplay;
    // User
  } else if (user?.role === UserRoles.User) {
    if (minRole === UserRoles.User || otherCriteria) return <>{children}</>;
    else return alternativeDisplay;
  } else return alternativeDisplay;
};

export default Permission;
