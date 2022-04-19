import React from "react";

import {
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
import Permission from "../../Common/Permission";
import { UserRoles } from "../../../generated/graphql";

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
              <Permission minRole={UserRoles.ProjectManager}>
                <MenuItem onClick={() => router.push("/jobsite-reports")}>
                  Jobsite Reports
                </MenuItem>
              </Permission>
              <MenuItem onClick={() => router.push("/daily-reports")}>
                Daily Reports
              </MenuItem>
              <MenuItem onClick={() => router.push("/jobsites")}>
                Jobsites
              </MenuItem>

              <MenuDivider />

              <MenuItem onClick={() => router.push(`/settings`)}>
                Settings
              </MenuItem>
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
