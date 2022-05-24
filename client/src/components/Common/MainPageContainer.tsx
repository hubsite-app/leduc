import React from "react";

import { Box } from "@chakra-ui/layout";
import { navbarHeight } from "../../constants/styles";
import { useRouter } from "next/router";
import { Icon } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";

const MainPageContainer: React.FC = ({ children }) => {
  /**
   * ----- Hook Initialization -----
   */

  const router = useRouter();

  /**
   * ----- Rendering -----
   */

  return (
    <Box
      id="prop-container"
      display="flex"
      flexDir="row"
      pt={navbarHeight}
      pr={"0"}
    >
      <Box
        onClick={() => router.back()}
        position="absolute"
        mt={1}
        ml={1}
        cursor="pointer"
      >
        <Icon as={FiArrowLeft} />
      </Box>
      {children}
    </Box>
  );
};

export default MainPageContainer;
