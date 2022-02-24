import * as React from "react";

import { Box, Stack, Heading } from "@chakra-ui/react";

import { navbarHeight } from "../../constants/styles";
import { useAuth } from "../../contexts/Auth";
import { FiPlusSquare } from "react-icons/fi";
import { Icon } from "@chakra-ui/icon";
import { useMediaQuery } from "@chakra-ui/media-query";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { IconButton } from "@chakra-ui/button";
import { FiMenu } from "react-icons/fi";
import TextLink from "../Common/TextLink";
import { useRouter } from "next/router";
import useMounted from "../../hooks/useMounted";

const Navbar = () => {
  const {
    state: { user },
    logout,
  } = useAuth();
  const { hasMounted } = useMounted();
  const [isLargerThan480] = useMediaQuery("(min-width: 580px)");

  const router = useRouter();

  const isLarger = hasMounted ? isLargerThan480 : true;

  const responsiveContent = React.useMemo(() => {
    if (isLarger) {
      return (
        <Stack
          spacing={6}
          direction="row"
          mr={4}
          height="100%"
          pt={user ? 1 : 2}
        ></Stack>
      );
    } else {
      /**
       * ----- Mobile -----
       */
      return (
        <Menu>
          {/* @ts-expect-error */}
          <MenuButton
            bgColor="transparent"
            mt={1}
            aria-label="menu"
            as={IconButton}
            icon={<FiMenu />}
          />
          <MenuList>
            <MenuGroup title="Pages">
              <MenuItem onClick={() => router.push("/questions")}>
                Questions
              </MenuItem>
            </MenuGroup>
            {/* {user ? (
              <MenuGroup title={`${user.firstName} ${user.lastName}`}>
                <MenuItem onClick={() => router.push("/create-page")}>
                  Create
                </MenuItem>
                <MenuItem onClick={() => router.push(`/u/${user._id}`)}>
                  Profile
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => logout()}>Logout</MenuItem>
              </MenuGroup>
            ) : (
              <Box
                m="auto"
                py={2}
                w="100%"
                display="flex"
                justifyContent="center"
              >
                <NavbarAccount />
              </Box>
            )} */}
          </MenuList>
        </Menu>
      );
    }
  }, [isLarger, user, router]);

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
        {responsiveContent}
      </Box>
    </Box>
  );
};

export default Navbar;
