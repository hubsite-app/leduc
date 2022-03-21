import React from "react";

import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/Auth";
import Loading from "../../Common/Loading";

const NavbarAccount = () => {
  const {
    logout,
    state: { user },
  } = useAuth();

  const router = useRouter();

  const content = React.useMemo(() => {
    if (user) {
      return (
        <Menu>
          <MenuButton
            backgroundColor="gray.700"
            fontWeight="bold"
            borderRadius="50%"
            width="40px"
            height="40px"
            color="white"
            _hover={{ backgroundColor: "gray.800" }}
          >
            {user.name.charAt(0)}
          </MenuButton>
          <MenuList>
            <MenuGroup>
              <MenuItem onClick={() => router.push("/materials")}>
                Materials
              </MenuItem>
              <MenuItem onClick={() => router.push(`/me`)}>Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      );
    } else if (user === null) {
      return null;
    } else {
      return <Loading />;
    }
  }, [logout, router, user]);

  return content;
};

export default NavbarAccount;
