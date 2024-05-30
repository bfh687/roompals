import React, { useEffect, useRef } from "react";
import useTooltip from "./useTooltip.js";

const Tooltip = ({ children, elementRef }) => {
  const tooltipRef = useRef(null);

  const { position, isVisible, onMouseEnter, onMouseLeave } = useTooltip({
    ref: elementRef,
    tooltipRef: tooltipRef,
  });

  useEffect(() => {
    const element = elementRef?.current;

    if (element) {
      element.addEventListener("mouseenter", onMouseEnter);
      element.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mouseenter", onMouseEnter);
        element.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [elementRef, onMouseEnter, onMouseLeave]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={tooltipRef}
      style={
        isVisible
          ? {
              zIndex: "999999",
              top: position.top + 5,
              left: position.left,
              right: "auto",
              position: "absolute",
              maxWidth: "400px",
              padding: "10px 12px",
              backgroundColor: "#0b0b23",
              border: "1px solid #4f4f60",
              borderRadius: "5px",
              boxShadow: "0 2px 4px #070720",
              boxSizing: "border-box",
              transform: "rotate(1turn) translateZ(0) scale(1) !important",
              transition: "transform 1s, opacity 1s",
              opacity: "1",
            }
          : {}
      }
    >
      {children}
      <div
        style={{
          left: "50%",
          right: "auto",
          top: "-8px",
          transform: "translateX(-50%) rotate(135deg)",
          zIndex: "99",
          position: "absolute",
          width: "13px",
          height: "13px",
          borderLeft: "1px solid #4f4f60",
          borderBottom: "1px solid #4f4f60",
          backgroundColor: "#0b0b23",
        }}
      ></div>
    </div>
  );
};

export default Tooltip;
//   return (
//     <div>
//       <div style={{ width: "100px", height: "100px", backgroundColor: "red" }}></div>
//       <div
//         style={{
//           display: "block",
//           visibility: "visible",
//           zIndex: "999999",
//           left: "76px",
//           top: "396px",
//           right: "auto",
//           position: "absolute",
//           maxWidth: "400px",
//           padding: "10px 12px",
//           backgroundColor: "#0b0b23",
//           border: "1px solid #4f4f60",
//           borderRadius: "3px",
//           boxShadow: "0 2px 4px #070720",
//           boxSizing: "border-box",
//         }}
//       >
//         {children}
//         <div
//           style={{
//             left: "50%",
//             right: "auto",
//             bottom: "-7px",
//             transform: "translateX(-50%) rotate(-45deg)",
//             zIndex: "99",
//             position: "absolute",
//             width: "13px",
//             height: "13px",
//             borderLeft: "1px solid #4f4f60",
//             borderBottom: "1px solid #4f4f60",
//             backgroundColor: "#0b0b23",
//           }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default Tooltip;
