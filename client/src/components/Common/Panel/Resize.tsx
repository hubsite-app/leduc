import { Box } from "@chakra-ui/react";
import React from "react";

interface IPanelResizer {
  onResize: (
    direction: Direction,
    movementX: number,
    movementY: number
  ) => void;
}

export enum Direction {
  TopLeft = "topLeft",
  Top = "top",
  TopRight = "topRight",
  Right = "right",
  BottomRight = "bottomRight",
  Bottom = "bottom",
  BottomLeft = "bottomLeft",
  Left = "left",
}

const PanelResizer = ({ onResize }: IPanelResizer) => {
  /**
   * ----- Hook Initialization -----
   */

  const [direction, setDirection] = React.useState<Direction | null>(null);
  const [mouseDown, setMouseDown] = React.useState(false);

  /**
   * ----- Functions -----
   */

  const handleMouseDown = (direction: Direction) => {
    setDirection(direction);
    setMouseDown(true);
  };

  /**
   * ----- Logic -----
   */

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!direction) return;

      onResize(direction, e.movementX, e.movementY);
    };

    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, direction, onResize]);

  React.useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  /**
   * ----- Render -----
   */

  return (
    <>
      <Box
        className="top-left"
        position="absolute"
        cursor="nwse-resize"
        height="10px"
        width="10px"
        zIndex="2"
        left="0"
        top="0"
        onMouseDown={() => handleMouseDown(Direction.TopLeft)}
      ></Box>

      <Box
        className="top"
        position="absolute"
        cursor="ns-resize"
        height="4px"
        width="100%"
        zIndex="1"
        left="0"
        top="0"
        onMouseDown={() => handleMouseDown(Direction.Top)}
      ></Box>

      <Box
        className="top-right"
        position="absolute"
        cursor="nesw-resize"
        height="10px"
        width="10px"
        zIndex="2"
        right="0"
        top="0"
        onMouseDown={() => handleMouseDown(Direction.TopRight)}
      ></Box>

      <Box
        className="right"
        position="absolute"
        cursor="ew-resize"
        width="4px"
        height="100%"
        zIndex="1"
        right="0"
        top="0"
        onMouseDown={() => handleMouseDown(Direction.Right)}
      ></Box>

      <Box
        className="bottom-right"
        position="absolute"
        cursor="nwse-resize"
        width="10px"
        height="10px"
        zIndex="2"
        right="0"
        bottom="0"
        onMouseDown={() => handleMouseDown(Direction.BottomRight)}
      ></Box>

      <Box
        className="bottom"
        position="absolute"
        cursor="ns-resize"
        width="100%"
        height="4px"
        zIndex="1"
        bottom="0"
        left="0"
        onMouseDown={() => handleMouseDown(Direction.Bottom)}
      ></Box>

      <Box
        className="bottom-left"
        position="absolute"
        cursor="nesw-resize"
        width="10px"
        height="10px"
        zIndex="2"
        bottom="0"
        left="0"
        onMouseDown={() => handleMouseDown(Direction.BottomLeft)}
      ></Box>

      <Box
        className="left"
        position="absolute"
        cursor="ew-resize"
        width="4px"
        height="100%"
        zIndex="1"
        left="0"
        top="0"
        onMouseDown={() => handleMouseDown(Direction.Left)}
      ></Box>
    </>
  );
};

export default PanelResizer;
