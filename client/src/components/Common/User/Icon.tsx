import { Box, Heading, MenuButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { UserCardSnippetFragment } from "../../../generated/graphql";
import getRandomColor from "../../../utils/getRandomColor";

interface IUserIcon {
  user: UserCardSnippetFragment;
  menuButton?: boolean;
  onClick?: () => void;
  hideTooltip?: boolean;
}

const UserIcon = ({ user, menuButton, onClick, hideTooltip }: IUserIcon) => {
  const props = React.useMemo(() => {
    return {
      backgroundColor: getRandomColor(user.name),
      fontWeight: "bold",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      color: "white",
      cursor: "pointer",
      p: "auto",
    };
  }, [user.name]);

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

  return React.useMemo(() => {
    if (!hideTooltip) {
      return <Tooltip label={user.name}>{content}</Tooltip>;
    } else {
      return content;
    }
  }, [content, hideTooltip, user.name]);
};

export default UserIcon;
