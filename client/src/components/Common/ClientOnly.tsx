import React from "react";

const ClientOnly: React.FC = ({ children }) => {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <div>{children}</div>;
};

export default ClientOnly;
