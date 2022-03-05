import React from "react";
import { useAuth } from "../../contexts/Auth";

const AdminOnly: React.FC = ({ children }) => {
  const {
    state: { user },
  } = useAuth();

  if (user?.admin) return <>{children}</>;
  else return null;
};

export default AdminOnly;
