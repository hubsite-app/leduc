import { Box, Heading, MenuButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { UserCardSnippetFragment } from "../../../generated/graphql";

interface IUserIcon {
  user: UserCardSnippetFragment;
  menuButton?: boolean;
  onClick?: () => void;
}

const UserIcon = ({ user, menuButton, onClick }: IUserIcon) => {
  const props = React.useMemo(() => {
    return {
      backgroundColor: "gray.700",
      fontWeight: "bold",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      color: "white",
      _hover: { backgroundColor: "gray.800" },
      cursor: "pointer",
      p: "auto",
    };
  }, []);

  const content = React.useMemo(() => {
    if (menuButton) {
      return <MenuButton {...props}>{user.name.charAt(0)}</MenuButton>;
    } else {
      return (
        <Box {...props} display="flex" alignItems="center" onClick={onClick}>
          <Heading m="auto" my="auto" size="sm" textAlign="center">
            {user.name.charAt(0)}
          </Heading>
        </Box>
      );
    }
  }, [menuButton, props, user.name, onClick]);

  return <Tooltip label={user.name}>{content}</Tooltip>;
};

export default UserIcon;
