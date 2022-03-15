import * as React from "react";

import { Box, Stack, Heading, Icon } from "@chakra-ui/react";

import { navbarHeight } from "../../constants/styles";
import { useMediaQuery } from "@chakra-ui/media-query";

import TextLink from "../Common/TextLink";
import useMounted from "../../hooks/useMounted";
import NavbarAccount from "./views/Account";
import NavbarSearch from "./views/Search";
import { useAuth } from "../../contexts/Auth";
import { FiPlusSquare } from "react-icons/fi";
import NavbarCreate from "./views/Create";

const Navbar = () => {
  const {
    state: { user },
  } = useAuth();
  const { hasMounted } = useMounted();
  const [isLargerThan480] = useMediaQuery("(min-width: 580px)");

  const isLarger = hasMounted ? isLargerThan480 : true;

  return (
    <Box
      shadow="bottomShadow"
      p={1}
      position="fixed"
      height={navbarHeight}
      width="100%"
      zIndex="998"
      backgroundColor="red.500"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        minW="80%"
        margin="0 auto"
        height="100%"
      >
        <TextLink
          color="black"
          link="/"
          marginY="auto"
          height="100%"
          pt={1}
          ml={4}
        >
          <Heading
            as="h4"
            fontSize={["xl", "2xl", "3xl"]}
            h="100%"
            p="auto"
            mt={[1, 0]}
          >
            {isLarger ? "Bow Mark" : "BM"}
          </Heading>
        </TextLink>
        <NavbarSearch />
        <Stack
          spacing={isLarger ? 6 : 2}
          direction="row"
          mr={4}
          height="100%"
          pt={isLarger ? 1 : 1}
        >
          <NavbarCreate />

          <NavbarAccount />
        </Stack>
      </Box>
    </Box>
  );
};

export default Navbar;
