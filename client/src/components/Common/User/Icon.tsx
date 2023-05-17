import { Box, Heading, MenuButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import getRandomColor from "../../../utils/getRandomColor";

interface IUserIcon {
  name: string;
  menuButton?: boolean;
  onClick?: () => void;
  hideTooltip?: boolean;
}

const UserIcon = ({ name, menuButton, onClick, hideTooltip }: IUserIcon) => {
  const props = React.useMemo(() => {
    return {
      backgroundColor: getRandomColor(name),
      fontWeight: "bold",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      color: "white",
      cursor: "pointer",
      p: "auto",
    };
  }, [name]);

  const content = React.useMemo(() => {
    if (menuButton) {
      return <MenuButton {...props}>{name.charAt(0)}</MenuButton>;
    } else {
      return (
        <Box {...props} display="flex" alignItems="center" onClick={onClick}>
          <Heading m="auto" my="auto" size="sm" textAlign="center">
            {name.charAt(0)}
          </Heading>
        </Box>
      );
    }
  }, [menuButton, props, name, onClick]);

  return React.useMemo(() => {
    if (!hideTooltip) {
      return <Tooltip label={name}>{content}</Tooltip>;
    } else {
      return content;
    }
  }, [content, hideTooltip, name]);
};

export default UserIcon;
