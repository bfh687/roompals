import React, { useState, useEffect, useRef } from "react";

const AnimationButton = ({
  buttonColor,
  buttonRef,
  text,
  textColor,
  width,
  height,
  onClick,
  afterOnClick,
  disappearAfterOnClick,
}) => {
  const [state, setState] = useState(1);
  const [className, setClassName] = useState("button-anim-done");

  const buttonTextRef = useRef(null);

  const [onClickSuccess, setOnClickSuccess] = useState(false);

  useEffect(() => {
    const handleState = async () => {
      if (state === 1) {
        setClassName("button-anim-init");
      } else if (state === 2) {
        const success = await onClick();
        setOnClickSuccess(success);

        if (!disappearAfterOnClick || !success) {
          setState(1);
          return;
        }

        setClassName("button-anim-loading");
        setState(3);
      } else if (state === 3) {
        setClassName("button-anim-done text-color");
        setTimeout(() => {
          if (afterOnClick && onClickSuccess) {
            afterOnClick();
          } else {
            setState(0);
          }
        }, 1000);
      }
    };

    handleState();
  }, [state]);

  return (
    <div style={{ display: "flex" }}>
      <button
        ref={buttonRef}
        className={className + " form-button"}
        onClick={() => setState(2)}
        style={{ backgroundColor: buttonColor, color: textColor, width: width, height: height }}
      >
        {state === 1 && (
          <span ref={buttonTextRef} style={{ whiteSpace: "nowrap", padding: "5px 8px" }}>
            {text}
          </span>
        )}
        {state === 2 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="text-color"
            style={{ width: "20px", height: "20px" }}
          >
            <path
              fill="currentColor"
              d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
            >
              <animateTransform
                attributeName="transform"
                dur="1.125s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              ></animateTransform>
            </path>
          </svg>
        )}
        {state === 3 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="button-checkmark"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default AnimationButton;
