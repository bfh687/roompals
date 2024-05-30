import { useState, useEffect, useCallback } from "react";

const useTooltip = ({ ref, tooltipRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({});

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (isVisible) {
      const { left, width, bottom } = ref.current.getBoundingClientRect();
      const tooltipWidth = tooltipRef?.current?.getBoundingClientRect().width || 0;
      const middle = left + width / 2 - tooltipWidth / 2;
      const verticalOffset = 12;

      setPosition({
        top: bottom + verticalOffset,
        left: middle,
        width,
      });
    }

    if (!isVisible) {
      setPosition({});
    }
  }, [isVisible, ref, tooltipRef]);

  const onMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    position: {
      top: position.top ?? 0,
      left: position.left ?? 0,
      width: position.width ?? 0,
    },
    isVisible,
    onMouseEnter,
    onMouseLeave,
  };
};

export default useTooltip;
