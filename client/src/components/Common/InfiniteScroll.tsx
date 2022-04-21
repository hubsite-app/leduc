import React from "react";
import useMounted from "../../hooks/useMounted";

interface IInfiniteScroll {
  content: JSX.Element;
  nextPage: () => void;
}

const InfiniteScroll = ({ content, nextPage }: IInfiniteScroll) => {
  /**
   * ----- Hook Initialization -----
   */

  const { hasMounted } = useMounted();

  /**
   * ----- Functions -----
   */

  const detectBottom = React.useCallback(
    (callback: () => void) => {
      if (hasMounted) {
        if (
          document.body.getBoundingClientRect().bottom - 1 <=
          window.innerHeight
        ) {
          callback();
        }
      }
    },
    [hasMounted]
  );

  /**
   * ----- Use-effects and other logic -----
   */

  // handle loading on scroll
  React.useEffect(() => {
    if (hasMounted) {
      detectBottom(nextPage);
      window.onscroll = () => detectBottom(nextPage);
    }
  });

  /**
   * ----- Rendering -----
   */

  return content;
};

export default InfiniteScroll;
