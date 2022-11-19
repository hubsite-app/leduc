// https://nmingaleev.medium.com/draggable-and-resizable-panel-with-react-hooks-part-1-740a12a8c8da

import { Box, Portal } from "@chakra-ui/react";
import React from "react";
import PanelHeader from "./Header";
import PanelResizer, { Direction } from "./Resize";

interface IPanel {
  name: string;
  id: string;
  children: React.ReactNode;
  loading?: boolean;
  minWidth?: number;
  minHeight?: number;
}

const Panel = ({
  children,
  name,
  id,
  minWidth = 250,
  minHeight = 250,
}: IPanel) => {
  /**
   * ----- Hook Initialization -----
   */

  const panelRef = React.useRef<HTMLDivElement>(null);

  /**
   * ----- Functions -----
   */

  const handleDrag = (movementX: number, movementY: number) => {
    const panel = panelRef.current;
    if (!panel) return;

    const { x, y } = panel.getBoundingClientRect();

    panel.style.left = `${x + movementX}px`;
    panel.style.top = `${y + movementY}px`;
  };

  const handleResize = (
    direction: Direction,
    movementX: number,
    movementY: number
  ) => {
    const panel = panelRef.current;
    if (!panel) return;

    const { width, height, x, y } = panel.getBoundingClientRect();

    const resizeTop = () => {
      const newHeight = height - movementY;

      if (newHeight >= minHeight) {
        panel.style.height = `${height - movementY}px`;
        panel.style.top = `${y + movementY}px`;
      }
    };

    const resizeRight = () => {
      const newWidth = width + movementX;

      if (newWidth >= minWidth) panel.style.width = `${newWidth}px`;
    };

    const resizeBottom = () => {
      const newHeight = height + movementY;

      if (newHeight >= minHeight) panel.style.height = `${newHeight}px`;
    };

    const resizeLeft = () => {
      const newWidth = width - movementX;

      if (newWidth >= minWidth) {
        panel.style.width = `${newWidth}px`;
        panel.style.left = `${x + movementX}px`;
      }
    };

    switch (direction) {
      case Direction.TopLeft:
        resizeTop();
        resizeLeft();
        break;
      case Direction.Top:
        resizeTop();
        break;
      case Direction.Right:
        resizeRight();
        break;
      case Direction.BottomRight:
        resizeBottom();
        resizeRight();
        break;
      case Direction.Bottom:
        resizeBottom();
        break;
      case Direction.BottomLeft:
        resizeBottom();
        resizeLeft();
        break;
      case Direction.Left:
        resizeLeft();
        break;
      default:
        break;
    }
  };

  /**
   * ----- Rendering -----
   */

  return (
    <Portal>
      <Box
        ref={panelRef}
        position="fixed"
        top="200px"
        left="200px"
        border="1px solid black"
        overflow="hidden"
        backgroundColor="white"
        borderRadius="0.25em"
      >
        <PanelResizer onResize={handleResize} />
        <PanelHeader id={id} name={name} onDrag={handleDrag} />
        {children}
      </Box>
    </Portal>
  );
};

export default Panel;
