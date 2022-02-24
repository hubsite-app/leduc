import React from "react";

import { Box } from "@chakra-ui/layout";
import { navbarHeight } from "../../constants/styles";

const MainPageContainer: React.FC = ({ children }) => {
  return (
    <Box
      id="prop-container"
      display="flex"
      flexDir="row"
      pt={navbarHeight}
      pr={"0"}
    >
      {children}
    </Box>
  );
};

export default MainPageContainer;
