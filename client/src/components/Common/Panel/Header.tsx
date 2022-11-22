import React from "react";

import { Flex, IconButton, Heading } from "@chakra-ui/react";
import { FiMinus, FiX } from "react-icons/fi";
import { usePanel } from "../../../contexts/Panel";

interface IPanelHeader {
  name: string;
  id: string;
  onDrag: (movementX: number, movementY: number) => void;
}

const PanelHeader = ({ name, onDrag, id }: IPanelHeader) => {
  /**
   * ----- Hook Initialization ----
   */

  const [mouseDown, setMouseDown] = React.useState(false);

  const { removePanel, minimizePanel } = usePanel();

  /**
   * ----- Logic -----
   */

  React.useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => onDrag(e.movementX, e.movementY);

    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, onDrag]);

  const handleMouseDown = () => setMouseDown(true);

  /**
   * ----- Render -----
   */

  return (
    <Flex
      flexDir="row"
      justifyContent="space-between"
      padding={2}
      backgroundColor="gray.300"
      onMouseDown={handleMouseDown}
    >
      <Heading size="md" my="auto" ml={2}>
        {name}
      </Heading>

      <Flex flexDir="row">
        <IconButton
          icon={<FiMinus />}
          aria-label="minimize"
          onClick={() => minimizePanel(id)}
          background="transparent"
        />
        <IconButton
          aria-label="close"
          icon={<FiX />}
          onClick={() => removePanel(id)}
          background="transparent"
        />
      </Flex>
    </Flex>
  );
};

export default PanelHeader;
