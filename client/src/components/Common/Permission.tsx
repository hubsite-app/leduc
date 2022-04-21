import React from "react";
import { useAuth } from "../../contexts/Auth";
import { UserRoles } from "../../generated/graphql";

interface IPermission {
  minRole?: UserRoles;
  otherCriteria?: boolean;
}

const Permission: React.FC<IPermission> = ({
  minRole = UserRoles.Admin,
  otherCriteria = false,
  children,
}) => {
  const {
    state: { user },
  } = useAuth();

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
    else return null;
    // User
  } else if (user?.role === UserRoles.User) {
    if (minRole === UserRoles.User || otherCriteria) return <>{children}</>;
    else return null;
  } else return null;
};

export default Permission;
