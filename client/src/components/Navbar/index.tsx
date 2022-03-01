import * as React from "react";

import { Box, Stack, Heading } from "@chakra-ui/react";

import { navbarHeight } from "../../constants/styles";
import { useMediaQuery } from "@chakra-ui/media-query";

import TextLink from "../Common/TextLink";
import useMounted from "../../hooks/useMounted";
import NavbarAccount from "./views/Account";

const Navbar = () => {
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
            fontSize={["2xl", "2xl", "3xl"]}
            h="100%"
            p="auto"
            mt={[1, 0]}
          >
            Bow Mark
          </Heading>
        </TextLink>
        <Stack
          spacing={isLarger ? 6 : 2}
          direction="row"
          mr={4}
          height="100%"
          pt={isLarger ? 1 : 1}
        >
          <NavbarAccount />
        </Stack>
      </Box>
    </Box>
  );
};

export default Navbar;
